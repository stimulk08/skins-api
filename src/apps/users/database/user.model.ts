export class UserModel {
  id: string;
  name: string;
  balance: string;
  created_at: Date;

  constructor(data: {
    id: string;
    name: string;
    balance: string;
    createdAt: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.balance = data.balance;
    this.created_at = data.createdAt;
  }
}
