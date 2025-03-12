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
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  }

  async create(username: string): Promise<UserModel> {
    const response = await this.sql<UserModel[]>`
    INSERT INTO users (name) VALUES (${username}) RETURNING *;`;

    return response?.[0];
  }

  async findByUsername(username: string): Promise<UserModel | null> {
    const response = await this.sql<
      UserModel[]
    >`SELECT * from users WHERE name = ${username}`;

    return response?.[0];
  }

  getAll(): Promise<UserModel[]> {
    return this.sql<UserModel[]>`SELECT * FROM users`;
  }

  async findById(userId: string): Promise<UserModel | null> {
    const response = await this.sql<UserModel[]>`
    SELECT * FROM users WHERE id = ${userId}`;

    return response?.[0] || null;
  }

  async increaseBalance(
    userId: string,
    replenishmentAmount: number,
  ): Promise<UserModel> {
    const response = await this.sql<UserModel[]>`UPDATE users
        SET balance = balance + ${replenishmentAmount}
        WHERE id = ${userId}
        RETURNING *;`;
    return response?.[0];
  }
}

export const userRepository = new UserRepository(sqlConnection);
