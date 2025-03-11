import postgres from 'postgres';

import { ProductModel } from '@apps/products/dto/response/product.response';
import { PurchaseModel } from '@apps/purchase/database/purchase.model';
import { UserModel } from '@apps/users/database/user.model';
import { sql as sqlConnection } from '@libs/postgres/pg-connection';

export class PurchaseRepository {
  constructor(private readonly sql: postgres.Sql) {
    this.createTable();
  }

  private async createTable(): Promise<void> {
    await this.sql`
      CREATE TABLE IF NOT EXISTS purchases (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        product_id UUID REFERENCES products(id) ON DELETE SET NULL,
        quantity INT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
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
      const [userResponse, productResponse] = await Promise.all([
        sql<
          UserModel[]
        >`SELECT balance FROM users WHERE id = ${userId} FOR UPDATE`,
        sql<
          ProductModel[]
        >`SELECT untradablePrice, tradablePrice, quantity FROM products WHERE id = ${productId} FOR UPDATE`,
      ]);

      const user = userResponse?.[0];
      const product = productResponse?.[0];

      if (!user) {
        throw new Error('Пользователь не найден');
      }
      if (!product) {
        throw new Error('Продукт не найден');
      }

      product.tradableprice = Number(product.tradableprice);
      product.untradableprice = Number(product.untradableprice);
      product.quantity = Number(product.quantity);

      user.balance = Number(user.balance);

      if (Number.isNaN(product.tradableprice) || product.tradableprice <= 0) {
        throw new Error('Продукт не торгуется');
      }

      // 2. Проверяем, достаточно ли баланса у пользователя
      const totalCost = product.tradableprice * quantity;
      if (user.balance < totalCost) {
        throw new Error('Недостаточно средств на балансе');
      }

      // 3. Проверяем, достаточно ли товара на складе
      if (product.quantity < quantity) {
        throw new Error('Недостаточно товара на складе');
      }

      // 4. Списание стоимости товара с баланса пользователя
      await sql`
        UPDATE users
        SET balance = balance - ${totalCost}
        WHERE id = ${userId}
      `;

      // 5. Уменьшение количества товара на складе
      await sql`
        UPDATE products
        SET quantity = ${product.quantity - quantity}
        WHERE id = ${productId}
      `;

      // 6. Создание записи о покупке
      const createPurchaseResponse = await sql<PurchaseModel[]>`
        INSERT INTO purchases (user_id, product_id, quantity)
        VALUES (${userId}, ${productId}, ${quantity})
        RETURNING *
      `;

      purchase = createPurchaseResponse?.[0];
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
