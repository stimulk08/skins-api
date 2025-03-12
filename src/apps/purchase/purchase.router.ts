import { t } from 'elysia';

import { purchaseService } from '@apps/purchase/purchase.service';
import { userService } from '@apps/users/user.service';
import { HttpMethod } from '@common/http-method';
import { Router } from '@common/router';
import { UUID_PATTERN } from '@common/uuid-pattern';

export class PurchaseRouter extends Router {
  constructor() {
    super('/purchases', 'Покупки', [
      {
        method: HttpMethod.POST,
        handler: async ({ set, body: { userId, productId, quantity } }) => {
          set.headers['Content-Type'] = 'application/json';
          const { data, status, success, errorMessage } =
            await purchaseService.create(productId, quantity, userId);
          set.status = status;
          if (!success) {
            return { status, errorMessage };
          }
          return data;
        },
        body: t.Object({
          userId: t.String({
            pattern: UUID_PATTERN,
            error: 'Неверный UUID',
          }),
          productId: t.String({
            pattern: UUID_PATTERN,
            error: 'Неверный UUID',
          }),
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
