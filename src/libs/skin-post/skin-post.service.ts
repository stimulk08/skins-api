import { ProductSkinPostItem } from '@apps/products/dto/response/product.response';
import { configService } from '@libs/config/config.service';
import { HttpClient } from '@libs/http/http-base.service';

export class SkinPostClient extends HttpClient {
  constructor(protected baseUrl: string) {
    super(baseUrl);
  }

  async findItems(
    tradable: boolean = false,
  ): Promise<ProductSkinPostItem[] | null> {
    // Создаем базовый URL
    const params = new URLSearchParams({
      tradable: (tradable ? 1 : 0).toString(),
    });
    // Выполняем GET-запрос
    try {
      return await this.get<ProductSkinPostItem[]>(
        `/items?${params.toString()}`,
      );
    } catch (error) {
      console.log('Error fetching items');
      return null;
    }
  }
}

export const skinPostClient = new SkinPostClient(
  configService.get('SKIN_POST_BASE_URL', 'string'),
);
