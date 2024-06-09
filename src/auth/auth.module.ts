import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RedisRepository } from 'src/redis/redis.repository';
import { ApiKeyService } from 'src/user/api-key.service';

@Module({
  providers: [AuthService, UserService, PrismaService, JwtService, RedisRepository, ApiKeyService],
  controllers: [AuthController]
})
export class AuthModule {}
