import Elysia from 'elysia';

import { RouteHandler } from '@common/handler';
import { HttpMethod } from '@common/http-method';

export class Router {
  constructor(
    readonly basePath: string,
    readonly tag: string,
    readonly handlers: RouteHandler[],
  ) {}

  init(app: Elysia): void {
    for (const handler of this.handlers) {
      const fullPath = `${this.basePath}${handler.route}`;

      switch (handler.method) {
        case HttpMethod.GET:
          app.get(fullPath, handler.handler, {
            response: handler.response,
            params: handler.params,
            tags: [this.tag],
          });
          break;
        case HttpMethod.POST:
          app.post(fullPath, handler.handler, {
            body: handler.body,
            response: handler.response,
            params: handler.params,
            tags: [this.tag],
          });
          break;
        case HttpMethod.PUT:
          app.put(fullPath, handler.handler, {
            body: handler.body,
            response: handler.response,
            params: handler.params,
            tags: [this.tag],
          });
          break;
        case HttpMethod.PATCH:
          app.patch(fullPath, handler.handler, {
            body: handler.body,
            response: handler.response,
            params: handler.params,
            tags: [this.tag],
          });
          break;
        case HttpMethod.DELETE:
          app.delete(fullPath, handler.handler, {
            response: handler.response,
            params: handler.params,
            tags: [this.tag],
          });
          break;
        default:
          console.warn(`Unsupported HTTP method: ${handler.method}`);
      }
    }
  }
}
