import {
  PRODUCTS_REDIS_KEY,
  PRODUCTS_REDIS_TTL,
} from '@apps/products/consts/redis-key.consts';
import {
  ProductRepository,
  skinRepository,
} from '@apps/products/database/produtcs.repository';
import { ProductResponse } from '@apps/products/dto/response/product.response';
import { ProductMapper } from '@apps/products/mappers/product.mapper';
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

  async loadProducts(): Promise<ProductResponse[]> {
    const skinPostProducts = await this.skinPostClient.findItems();
    if (!skinPostProducts) return [];
    const products = await this.productsRepository.createMany(
      ProductMapper.mapSkinPostItemToDtoMany(skinPostProducts),
    );
    return ProductMapper.mapModels(products);
  }

  async getProducts(): Promise<ProductResponse[]> {
    const cachedProducts =
      await this.redisService.get<ProductResponse[]>(PRODUCTS_REDIS_KEY);

    if (cachedProducts) {
      return cachedProducts;
    }
    const skinPostProducts = await this.skinPostClient.findItems();
    if (!skinPostProducts) return [];
    const productsMapped = ProductMapper.mapSkinPostArray(skinPostProducts);

    await this.redisService.set(
      PRODUCTS_REDIS_KEY,
      JSON.stringify(productsMapped),
      PRODUCTS_REDIS_TTL,
    );

    return productsMapped;
  }
}

export const productService = new ProductService(
  skinPostClient,
  redisService,
  skinRepository,
);
