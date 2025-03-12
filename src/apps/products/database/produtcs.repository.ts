import postgres from 'postgres';

import {
  CreateProductModelDto,
  ProductModel,
} from '@apps/products/database/product.model';
import { PRODUCTS_TABLE_NAME } from '@apps/products/database/produtcs.table';
import { sql as sqlConnection } from '@libs/postgres/pg-connection';

export class ProductRepository {
  constructor(
    private readonly sql: postgres.Sql,
    private readonly tableName: string,
  ) {
    this.createTable();
  }

  private async createTable(): Promise<void> {
    await this.sql`
    CREATE TABLE IF NOT EXISTS ${this.sql(this.tableName)} (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      tradable_price NUMERIC(10, 2),
      untradable_price NUMERIC(10, 2) NOT NULL,
      quantity INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  }

  async deleteAll(): Promise<void> {
    await this.sql`DELETE * from products`;
  }

  async create(dto: CreateProductModelDto): Promise<ProductModel> {
    const tradablePrice = dto.tradable_price || 0;
    const untradablePrice = dto.untradable_price || 0;

    const response = await this.sql<ProductModel[]>`
      INSERT INTO products 
      (tradable_price, name, untradable_price, quantity)
      VALUES (${tradablePrice}, ${dto.name}, ${untradablePrice}, ${dto.quantity})
      RETURNING *;
    `;
    return response?.[0];
  }

  async createMany(data: CreateProductModelDto[]): Promise<ProductModel[]> {
    return Promise.all(data.map(dto => this.create(dto)));
  }
}

export const skinRepository = new ProductRepository(
  sqlConnection,
  PRODUCTS_TABLE_NAME,
);
