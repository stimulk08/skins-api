import { SkinItem } from '@apps/skins/dto/response/skin.response';
import { configService } from '@libs/config/config.service';
import { HttpClient } from '@libs/http/http-base.service';

export class SkinPostClient extends HttpClient {
  constructor(protected baseUrl: string) {
    super(baseUrl);
  }

  async findItems(): Promise<SkinItem[]> {
    return this.get<SkinItem[]>('/items');
  }
}

export const skinPostClient = new SkinPostClient(
  configService.get('SKIN_POST_BASE_URL', 'string'),
);
