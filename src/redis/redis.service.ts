import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {  Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private redisManager: Redis) {}

  // getRedisClient(): Redis {
  //   return this.redisService.getClient();
  // }

  async insert(id: string, token): Promise<any> {
    return await this.redisManager.set(id, token)
  }

  // async getValue(key: string): Promise<any> {
  //   let value = await this.client.get(key);

  //   if (!key || !value) {
  //     throw new UnprocessableEntityException('Invalid key or null value');
  //   }

  //   try {
  //     value = JSON.parse(value);
  //   } catch (error) {
  //     Logger.error('value was probably a string');
  //   }

  //   return { success: true, data: value };
  // }
}