import {
  PRODUCTS_REDIS_KEY,
  PRODUCTS_REDIS_TTL,
} from '@apps/products/consts/redis-key.consts';
import {
  ProductRepository,
  skinRepository,
} from '@apps/products/database/produtcs.repository';
import { ProductModel } from '@apps/products/dto/response/product.response';
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

  async getProducts(): Promise<ProductModel[]> {
    const cachedProducts =
      await this.redisService.get<ProductModel[]>(PRODUCTS_REDIS_KEY);

    if (cachedProducts) {
      return cachedProducts;
    }
    const products = await this.skinPostClient.findItems();
    if (!products?.length) return [];

    const mappedProducts: ProductModel[] = products.map(skin => {
      return {
        name: skin.market_hash_name,
        tradableprice: skin.min_price,
        untradableprice: skin.suggested_price,
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
