import Elysia from 'elysia';

import { ProductsRouter } from '@apps/products/products.router';
import { Router } from '@common/router';

export const routers: Router[] = [new ProductsRouter()];

export const initRouters = (app: Elysia): Elysia => {
  for (const router of routers) {
    router.init(app);
  }
  return app;
};
