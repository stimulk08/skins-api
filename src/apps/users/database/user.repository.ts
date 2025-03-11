import postgres from 'postgres';

import { UserModel } from '@apps/users/database/user.model';
import { sql as sqlConnection } from '@libs/postgres/pg-connection';

export class UserRepository {
  constructor(private readonly sql: postgres.Sql) {
    this.createTable();
  }

  private async createTable(): Promise<void> {
    await this.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      balance NUMERIC(10, 2) NOT NULL DEFAULT 0,
      createdAt TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  }

  async create(username: string): Promise<UserModel> {
    const response = await this.sql<UserModel[]>`
    INSERT INTO users (name) VALUES (${username}) RETURNING *;`;

    return response?.[0];
  }

  async getAll(): Promise<UserModel[]> {
    const response = await this.sql<UserModel[]>`SELECT * FROM users`;
    return response;
  }
}

export const userRepository = new UserRepository(sqlConnection);
