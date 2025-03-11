import { t } from 'elysia';

import { purchaseService } from '@apps/purchase/purchase.service';
import { userService } from '@apps/users/user.service';
import { HttpMethod } from '@common/http-method';
import { Router } from '@common/router';

export class PurchaseRouter extends Router {
  constructor() {
    super('/purchases', [
      {
        method: HttpMethod.POST,
        handler: async ({ set, body: { userId, productId, quantity } }) => {
          set.headers['Content-Type'] = 'application/json';
          const data = await purchaseService.create(
            productId,
            quantity,
            userId,
          );
          return { data };
        },
        body: t.Object({
          userId: t.String(),
          productId: t.String(),
          quantity: t.Number(),
        }),
        route: '',
      },
      {
        method: HttpMethod.GET,
        handler: async ({ set }) => {
          set.headers['Content-Type'] = 'application/json';
          const data = await userService.getAll();
          return { data };
        },
        route: '',
      },
    ]);
  }
}
