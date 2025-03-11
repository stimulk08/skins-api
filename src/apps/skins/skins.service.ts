import {
  SKINS_REDIS_KEY,
  SKINS_REDIS_TTL,
} from '@apps/skins/consts/redis-key.consts';
import { SkinItem } from '@apps/skins/dto/response/skin.response';
import { RedisService, redisService } from '@libs/redis/redis.service';
import {
  SkinPostClient,
  skinPostClient,
} from '@libs/skin-post/skin-post.service';

export class SkinPostService {
  constructor(
    private readonly skinPostClient: SkinPostClient,
    private readonly redisService: RedisService,
  ) {}

  async getSkins(): Promise<SkinItem[]> {
    const cachedSkins =
      await this.redisService.get<SkinItem[]>(SKINS_REDIS_KEY);

    if (cachedSkins) {
      return cachedSkins;
    }
    const skins = await this.skinPostClient.findItems();

    await this.redisService.set(
      SKINS_REDIS_KEY,
      JSON.stringify(skins),
      SKINS_REDIS_TTL,
    );

    return skins;
  }
}

export const skinPostService = new SkinPostService(
  skinPostClient,
  redisService,
);
