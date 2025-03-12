export class ProductModel {
  name: string;
  tradable_price: string;
  untradable_price: string;
  quantity: number;
  createdAt: Date;

  constructor(data: {
    name: string;
    tradeablePrice: string;
    untradeablePrice: string;
    quantity: number;
    createdAt: Date;
  }) {
    this.name = data.name;
    this.tradable_price = data.tradeablePrice;
    this.untradable_price = data.untradeablePrice;
    this.quantity = data.quantity;
    this.createdAt = data.createdAt;
  }
}
