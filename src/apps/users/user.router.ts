import { t } from 'elysia';

import { purchaseService } from '@apps/purchase/purchase.service';
import { userService } from '@apps/users/user.service';
import { HttpMethod } from '@common/http-method';
import { Router } from '@common/router';
import { UUID_PATTERN } from '@common/uuid-pattern';

export class UsersRouter extends Router {
  constructor() {
    super('/users', 'Пользователи', [
      {
        method: HttpMethod.POST,
        handler: async ({ set, body: { username } }) => {
          set.headers['Content-Type'] = 'application/json';
          const { status, errorMessage, data, success } =
            await userService.create(username);
          set.status = status;
          if (!success) {
            return { status, errorMessage };
          }
          return data;
        },
        body: t.Object({
          username: t.String({ minLength: 5 }),
        }),
        route: '',
      },
      {
        method: HttpMethod.PATCH,
        handler: async ({ set, body: { amount }, params: { id } }) => {
          set.headers['Content-Type'] = 'application/json';
          const data = await userService.increaseBalance(id, amount);
          return { data };
        },
        params: t.Object({
          id: t.String({
            pattern: UUID_PATTERN,
            error: 'Неверный UUID',
            examples: ['3e8e6a3a-3e8e-3e8e-3e8e-3e8e3e8e3e8e'],
          }),
        }),
        body: t.Object({
          amount: t.Number(),
        }),
        route: '/:id/balance',
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
      {
        method: HttpMethod.GET,
        handler: async ({ set, params: { id } }) => {
          set.headers['Content-Type'] = 'application/json';
          const data = await userService.findById(id);
          return { data };
        },
        params: t.Object({
          id: t.String({
            pattern: UUID_PATTERN,
            error: 'Неверный UUID',
          }),
        }),
        route: '/:id',
      },
      {
        method: HttpMethod.GET,
        handler: async ({ set, params: { id } }) => {
          set.headers['Content-Type'] = 'application/json';
          const data = await purchaseService.getUserPurchases(id);
          return { data };
        },
        params: t.Object({
          id: t.String({
            pattern: UUID_PATTERN,
            error: 'Неверный UUID',
            examples: ['3e8e6a3a-3e8e-3e8e-3e8e-3e8e3e8e3e8e'],
          }),
        }),
        route: '/:id/purchases',
      },
    ]);
  }
}
