import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS',
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST');
        const port = configService.get<number>('REDIS_PORT');
        const password = configService.get<string>('REDIS_PASSWORD');

        console.log(
          `Connecting to Redis at ${host}:${port} with password ${password}`,
        );

        return new Redis({
          host,
          port,
          password,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
