import postgres from 'postgres';

import { ProductModel } from '@apps/products/database/product.model';
import { ProductResponse } from '@apps/products/dto/response/product.response';
import { PurchaseModel } from '@apps/purchase/database/purchase.model';
import { UserModel } from '@apps/users/database/user.model';
import { UserResponse } from '@apps/users/dto/response/user.response';
import { UserMapper } from '@apps/users/mappers/user.mapper';
import { sql as sqlConnection } from '@libs/postgres/pg-connection';

export class PurchaseRepository {
  constructor(private readonly sql: postgres.Sql) {}

  static async createTable(sql: postgres.Sql): Promise<void> {
    await sql`
      CREATE TABLE IF NOT EXISTS purchases (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        product_id UUID REFERENCES products(id) ON DELETE SET NULL,
        quantity INT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
  }

  private async updateUserBalance(
    sql: postgres.TransactionSql,
    userId: string,
    balance: number,
  ): Promise<void> {
    await sql`
        UPDATE users
        SET balance = ${balance}
        WHERE id = ${userId}
      `;
  }

  private async updateProductQuantity(
    sql: postgres.TransactionSql,
    productId: string,
    quantity: number,
  ): Promise<void> {
    await sql`
        UPDATE products
        SET quantity = ${quantity}
        WHERE id = ${productId}
      `;
  }

  private async createPurchase(
    sql: postgres.TransactionSql,
    productId: string,
    userId: string,
    quantity: number,
  ): Promise<PurchaseModel> {
    const createPurchaseResponse = await sql<PurchaseModel[]>`
        INSERT INTO purchases (user_id, product_id, quantity)
        VALUES (${userId}, ${productId}, ${quantity})
        RETURNING *
      `;

    return createPurchaseResponse?.[0];
  }

  private async getUserOrFail(
    sql: postgres.TransactionSql,
    id: string,
  ): Promise<UserResponse | never> {
    const userResponse = await sql<
      UserModel[]
    >`SELECT balance FROM users WHERE id = ${id} FOR UPDATE`;

    const user = userResponse?.[0];
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    return UserMapper.mapModel(user);
  }

  private async getProductOrFail(
    sql: postgres.TransactionSql,
    id: string,
  ): Promise<ProductResponse | never> {
    const productResult = await sql<
      ProductModel[]
    >`SELECT untradable_price, tradable_price, quantity, created_at FROM products WHERE id = ${id} FOR UPDATE`;

    const product = productResult?.[0];
    if (!product) {
      throw new Error('Продукт не найден');
    }

    const tradablePrice = Number(product.tradable_price);
    const untradablePrice = Number(product.untradable_price);
    const quantity = Number(product.quantity);

    if (Number.isNaN(tradablePrice) || tradablePrice <= 0 || quantity <= 0) {
      throw new Error('Продукт не торгуется');
    }

    return {
      ...product,
      tradablePrice,
      untradablePrice,
      quantity,
      createdAt: product.created_at,
    };
  }

  async purchaseProduct(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<PurchaseModel | null> {
    let purchase = null;
    // Начинаем транзакцию
    await this.sql.begin(async sql => {
      // 1. Получаем данные пользователя и продукта
      const [user, product] = await Promise.all([
        this.getUserOrFail(sql, userId),
        this.getProductOrFail(sql, productId),
      ]);

      // 2. Проверяем, достаточно ли баланса у пользователя
      const totalCost = product.tradablePrice * quantity;
      if (user.balance < totalCost) {
        throw new Error('Недостаточно средств на балансе');
      }

      // 3. Проверяем, достаточно ли товара на складе
      if (product.quantity < quantity) {
        throw new Error('Недостаточно товара на складе');
      }

      // 4. Списание стоимости товара с баланса пользователя
      await this.updateUserBalance(sql, userId, user.balance - totalCost);

      // 5. Уменьшение количества товара на складе
      await this.updateProductQuantity(
        sql,
        productId,
        product.quantity - quantity,
      );

      // 6. Создание записи о покупке
      purchase = await this.createPurchase(sql, productId, userId, quantity);
    });
    return purchase;
  }

  async getAll(): Promise<PurchaseModel[]> {
    return this.sql<PurchaseModel[]>`
      SELECT * FROM purchases
    `;
  }

  async getUserPurchases(userId: string): Promise<PurchaseModel[]> {
    return this.sql<PurchaseModel[]>`
      SELECT * FROM purchases WHERE user_id = ${userId}
    `;
  }
}

export const purchaseRepository = new PurchaseRepository(sqlConnection);
