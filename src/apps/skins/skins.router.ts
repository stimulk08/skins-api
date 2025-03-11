import { skinPostService } from '@apps/skins/skins.service';
import { HttpMethod } from '@common/http-method';
import { Router } from '@common/router';

export class SkinsRouter extends Router {
  constructor() {
    super('/skins', [
      {
        method: HttpMethod.GET,
        handler: () => skinPostService.getSkins(),
        route: '/get',
      },
    ]);
  }
}
