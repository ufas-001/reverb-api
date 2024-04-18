import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConversationModule } from './conversation/conversation.module';
import { SocketGateway } from './conversation/conversation.gateway';
import { RedisService } from './redis.service';
import { RedisModule } from './redis/redis.module';
import { RedisRepository } from './redis/redis.repository';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), UserModule, AuthModule, ConversationModule, RedisModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SocketGateway, RedisRepository],
})
export class AppModule {}
