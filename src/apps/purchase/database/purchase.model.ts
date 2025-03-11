export class PurchaseModel {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;

  constructor(data: {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    createdAt: Date;
  }) {
    this.id = data.id;
    this.userId = data.userId;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.createdAt = data.createdAt;
  }
}
