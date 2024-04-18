import { Injectable } from '@nestjs/common';
import { RedisService as NestRedisService } from 'nestjs-redis'; // Rename to avoid conflict
import Redis, { Redis as IORedis } from 'ioredis'; // Import Redis and rename to avoid conflict

@Injectable()
export class RedisService {
  private readonly redisClient: IORedis; // Use the renamed type

  constructor(private readonly nestRedisService: NestRedisService) {
    // Connect to the Redis server with custom host and port
    this.redisClient = new Redis({
      host: '127.0.0.1', // Replace with your Redis host
      port: 6379, // Replace with your Redis port
    });
  }

  async storeData(key: string, data: any): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(data));
  }

  async retrieveData(key: string): Promise<any | null> {
    const data = await this.redisClient.get(key);
    return data ? JSON.parse(data) : null;
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
}