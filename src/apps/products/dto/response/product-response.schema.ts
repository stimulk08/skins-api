import { t } from 'elysia';

import { ProductResponse } from '@apps/products/dto/response/product.response';

export const ProductResponseSchema = t.Array(
  t.Object(<Record<keyof ProductResponse, any>>{
    name: t.String(),
    tradablePrice: t.Number(),
    untradablePrice: t.Number(),
    quantity: t.Number(),
    createdAt: t.Number(),
  }),
);
