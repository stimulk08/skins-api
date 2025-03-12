import { UserModel } from '@apps/users/database/user.model';

export class UserResponse implements Omit<UserModel, 'balance' | 'created_at'> {
  id: string;
  name: string;
  createdAt: Date;
  balance: number;

  constructor(data: {
    id: string;
    name: string;
    createdAt: Date;
    balance: number;
  }) {
    this.balance = data.balance;
    this.id = data.id;
    this.name = data.name;
    this.createdAt = data.createdAt;
  }
}
