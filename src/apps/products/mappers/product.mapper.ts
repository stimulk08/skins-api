import {
  CreateProductModelDto,
  ProductModel,
} from '@apps/products/database/product.model';
import {
  ProductResponse,
  ProductSkinPostItem,
} from '@apps/products/dto/response/product.response';

export class ProductMapper {
  static mapModel(model: ProductModel): ProductResponse {
    return {
      id: model.id,
      name: model.name,
      tradablePrice: parseFloat(model.tradable_price),
      untradablePrice: parseFloat(model.untradable_price),
      quantity: model.quantity,
      createdAt: model.created_at,
    };
  }

  static mapModels(models: ProductModel[]): ProductResponse[] {
    return models.map(ProductMapper.mapModel);
  }

  static mapSkinPostResponse(item: ProductSkinPostItem): ProductResponse {
    return {
      name: item.market_hash_name,
      tradablePrice: item.min_price,
      untradablePrice: item.suggested_price,
      quantity: item.quantity,
      createdAt: new Date(item.created_at),
    };
  }

  static mapSkinPostArray(items: ProductSkinPostItem[]): ProductResponse[] {
    return items.map(ProductMapper.mapSkinPostResponse);
  }

  static mapSkinPostItemToDto(
    item: ProductSkinPostItem,
  ): CreateProductModelDto {
    return {
      name: item.market_hash_name,
      tradable_price: item.min_price,
      untradable_price: item.suggested_price,
      created_at: new Date(item.created_at),
      quantity: item.quantity,
    };
  }

  static mapSkinPostItemToDtoMany(
    items: ProductSkinPostItem[],
  ): CreateProductModelDto[] {
    return items.map(ProductMapper.mapSkinPostItemToDto);
  }
}
