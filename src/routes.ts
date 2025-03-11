import Elysia from 'elysia';

import { SkinsRouter } from '@apps/skins/skins.router';
import { Router } from '@common/router';

export const routers: Router[] = [new SkinsRouter()];

export const initRouters = (app: Elysia): Elysia => {
  for (const router of routers) {
    router.init(app);
  }
  return app;
};
