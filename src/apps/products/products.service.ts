import {
  PRODUCTS_REDIS_KEY,
  PRODUCTS_REDIS_TTL,
} from '@apps/products/consts/redis-key.consts';
import {
  ProductRepository,
  skinRepository,
} from '@apps/products/database/produtcs.repository';
import { ProductResponse } from '@apps/products/dto/response/product.response';
import { RedisService, redisService } from '@libs/redis/redis.service';
import {
  SkinPostClient,
  skinPostClient,
} from '@libs/skin-post/skin-post.service';

export class ProductService {
  constructor(
    private readonly skinPostClient: SkinPostClient,
    private readonly redisService: RedisService,
    private readonly productsRepository: ProductRepository,
  ) {}

  async clearCache(): Promise<void> {
    await this.redisService.del(PRODUCTS_REDIS_KEY);
  }

  async setCache(skins: any[]): Promise<void> {
    await this.redisService.set(
      PRODUCTS_REDIS_KEY,
      JSON.stringify(skins),
      PRODUCTS_REDIS_TTL,
    );
  }

  async getSkins(): Promise<ProductResponse[]> {
    const cachedSkins =
      await this.redisService.get<ProductResponse[]>(PRODUCTS_REDIS_KEY);

    if (cachedSkins) {
      return cachedSkins;
    }
    const skins = await this.skinPostClient.findItems();
    if (!skins?.length) return [];

    const mappedProducts: ProductResponse[] = skins.map(skin => {
      return {
        name: skin.market_hash_name,
        tradeablePrice: skin.min_price,
        untradeablePrice: skin.suggested_price,
        quantity: skin.quantity,
      };
    });

    await this.redisService.set(
      PRODUCTS_REDIS_KEY,
      JSON.stringify(mappedProducts),
      PRODUCTS_REDIS_TTL,
    );

    return mappedProducts;
  }
}

export const productService = new ProductService(
  skinPostClient,
  redisService,
  skinRepository,
);
