export class UserModel {
  id: string;
  username: string;
  balance: number;
  createdAt: Date;

  constructor(data: {
    id: string;
    username: string;
    balance: number;
    createdAt: Date;
  }) {
    this.id = data.id;
    this.username = data.username;
    this.balance = data.balance;
    this.createdAt = data.createdAt;
  }
}
