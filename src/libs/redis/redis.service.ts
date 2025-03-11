import Redis from 'ioredis';

import { configService } from '@libs/config/config.service';

export class RedisService {
  redisClient: Redis;

  constructor(redisUrl: string) {
    this.redisClient = new Redis(redisUrl); // Настройте Redis здесь, если необходимо
  }

  async get<T extends string | object>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key);
    if (value) {
      try {
        const parsedValue = JSON.parse(value);
        if (typeof parsedValue === 'object') {
          return parsedValue as T;
        }
        return value as unknown as T;
      } catch {
        return value as unknown as T;
      }
    }
    return null;
  }

  async set(key: string, value: string, expiration?: number): Promise<void> {
    if (expiration) {
      await this.redisClient.set(key, value, 'EX', expiration);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async del(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redisClient.exists(key);
    return result === 1;
  }

  public async quit(): Promise<void> {
    await this.redisClient.quit();
  }
}

export const redisService = new RedisService(
  configService.get('REDIS_URL', 'string'),
);
