import { HttpMethod } from '@common/http-method';

export type Handler = (...args: any[]) => any;

export class RouteHandler {
  constructor(
    public handler: Handler,
    public method: HttpMethod,
    public body?: any,
    public response?: any,
    public route: string = '',
  ) {}
}
