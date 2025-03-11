import postgres from 'postgres';

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
      tradablePrice NUMERIC(10, 2),
      untradablePrice NUMERIC(10, 2) NOT NULL,
      quantity INT NOT NULL DEFAULT 0,
      createdAt TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  }
}

export const skinRepository = new ProductRepository(
  sqlConnection,
  PRODUCTS_TABLE_NAME,
);
