import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisRepository {
  constructor(@Inject('REDIS') private readonly redisClient: Redis) {}

  async storeData(key: string, data: any): Promise<{ id: string; message: any }> {
    await this.redisClient.set(key, JSON.stringify(data));
    return { id: key, message: data }; // Assuming the ID is the same as the key
  }

  async retrieveData(key: string): Promise<any | null> {
    try {
      const data = await this.redisClient.get(key);
      if (data) {
        console.log('Retrieved data from Redis:', data);
        return JSON.parse(data);
      } else {
        console.log('No data found in Redis for key:', key);
        return null;
      }
    } catch (error) {
      console.error('Error parsing retrieved data from Redis:', error);
      return null;
    }
  }

  async pushToList(key: string, value: string): Promise<void> {
    await this.redisClient.lpush(key, value);
  }
  async getSetMembers(key: string): Promise<string[]> {
    return this.redisClient.smembers(key);
  }
  async addToSet(key: string, member: string): Promise<number> {
    return this.redisClient.sadd(key, member);
  }
  async removeFromSet(key: string, member: string): Promise<number> {
    return this.redisClient.srem(key, member);
  }
  async getListItems(key: string, start: number = 0, end: number = -1): Promise<string[]> {
    return this.redisClient.lrange(key, start, end);
  }

  // Add more methods as needed for your application
}