import { PurchaseModel } from '@apps/purchase/database/purchase.model';
import {
  PurchaseRepository,
  purchaseRepository,
} from '@apps/purchase/database/purchase.repository';

export class PurchaseService {
  constructor(private purchaseRepository: PurchaseRepository) {}

  create(
    productId: string,
    quantity: number,
    userId: string,
  ): Promise<PurchaseModel | null> {
    return this.purchaseRepository.purchaseProduct(userId, productId, quantity);
  }

  getAll(): Promise<PurchaseModel[]> {
    return this.purchaseRepository.getAll();
  }

  getUserPurchases(id: any): Promise<PurchaseModel[]> {
    return this.purchaseRepository.getUserPurchases(id);
  }
}

export const purchaseService = new PurchaseService(purchaseRepository);
