import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ApiKeyService } from './api-key.service';
@Module({
  providers: [UserService, PrismaService, JwtService, ApiKeyService],
  controllers: [UserController]
})
export class UserModule {}
