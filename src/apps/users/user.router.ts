import { t } from 'elysia';

import { userService } from '@apps/users/user.service';
import { HttpMethod } from '@common/http-method';
import { Router } from '@common/router';

export class UsersRouter extends Router {
  constructor() {
    super('/users', [
      {
        method: HttpMethod.POST,
        handler: async ({ set, body: { username } }) => {
          set.headers['Content-Type'] = 'application/json';
          const data = await userService.create(username);
          return { data };
        },
        body: t.Object({
          username: t.String(),
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
