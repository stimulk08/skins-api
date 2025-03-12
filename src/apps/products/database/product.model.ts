export class ProductModel {
  id?: string;
  name: string;
  tradable_price: string;
  untradable_price: string;
  quantity: number;
  created_at: Date;

  constructor(data: {
    id?: string;
    name: string;
    tradeablePrice: string;
    untradeablePrice: string;
    quantity: number;
    createdAt: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.tradable_price = data.tradeablePrice;
    this.untradable_price = data.untradeablePrice;
    this.quantity = data.quantity;
    this.created_at = data.createdAt;
  }
}

export class CreateProductModelDto {
  name: string;
  tradable_price: number;
  untradable_price: number;
  quantity: number;
  created_at: Date;

  constructor(data: {
    name: string;
    tradeablePrice: number;
    untradeablePrice: number;
    quantity: number;
    createdAt: Date;
  }) {
    this.name = data.name;
    this.tradable_price = data.tradeablePrice;
    this.untradable_price = data.untradeablePrice;
    this.quantity = data.quantity;
    this.created_at = data.createdAt;
  }
}
