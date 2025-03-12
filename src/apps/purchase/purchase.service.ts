import { PurchaseModel } from '@apps/purchase/database/purchase.model';
import {
  PurchaseRepository,
  purchaseRepository,
} from '@apps/purchase/database/purchase.repository';
import { Result } from '@common/result';

export class PurchaseService {
  constructor(private purchaseRepository: PurchaseRepository) {}

  async create(
    productId: string,
    quantity: number,
    userId: string,
  ): Promise<Result<PurchaseModel>> {
    try {
      const purchase = await this.purchaseRepository.purchaseProduct(
        userId,
        productId,
        quantity,
      );
      if (!purchase) {
        return {
          success: false,
          errorMessage: 'Failed to make purchase',
          status: 500,
        };
      }
      return { success: true, data: purchase, status: 200 };
    } catch (error: any) {
      return { status: 400, success: false, errorMessage: error.message };
    }
  }

  getAll(): Promise<PurchaseModel[]> {
    return this.purchaseRepository.getAll();
  }

  getUserPurchases(id: any): Promise<PurchaseModel[]> {
    return this.purchaseRepository.getUserPurchases(id);
  }
}

export const purchaseService = new PurchaseService(purchaseRepository);
