import { productService } from '@apps/products/products.service';
import { HttpMethod } from '@common/http-method';
import { Router } from '@common/router';

export class ProductsRouter extends Router {
  constructor() {
    super('/products', 'Продукты', [
      {
        method: HttpMethod.GET,
        handler: async ({ set }) => {
          set.headers['Content-Type'] = 'application/json';
          const data = await productService.getProducts();
          return { data };
        },
        route: '',
      },
      {
        method: HttpMethod.GET,
        handler: async ({ set }) => {
          set.headers['Content-Type'] = 'application/json';
          const data = await productService.loadProducts();
          return { data };
        },
        route: '/upload',
      },
    ]);
  }
}
