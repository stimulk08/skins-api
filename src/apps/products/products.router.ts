import { productService } from '@apps/products/products.service';
import { HttpMethod } from '@common/http-method';
import { Router } from '@common/router';

export class ProductsRouter extends Router {
  constructor() {
    super('/products/skin-post', 'Продукты', [
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
        method: HttpMethod.POST,
        handler: async ({ set }) => {
          set.headers['Content-Type'] = 'application/json';
          const data = await productService.loadProducts();
          return { data };
        },
        route: '/upload',
      },
      {
        method: HttpMethod.GET,
        handler: async ({ set }) => {
          set.headers['Content-Type'] = 'application/json';
          const data = await productService.getSavedProducts();
          return { data };
        },
        route: '/saved',
      },
    ]);
  }
}
