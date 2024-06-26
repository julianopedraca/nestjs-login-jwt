import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {  Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private redisManager: Redis) {}

  async insert(id: string, token): Promise<any> {
    return await this.redisManager.set(`Bearer ${id}`, token)
  }

  async getToken(uuid_token: string): Promise<string> {
    return await this.redisManager.get(uuid_token)
  }

  async delete(uuid_token: string): Promise<number> {
    return await this.redisManager.del(uuid_token)
  }
}