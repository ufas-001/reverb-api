import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { PrismaService } from 'src/prisma.service';
import { SocketGateway } from './conversation.gateway';


@Module({
  controllers: [ConversationController],
  providers: [ConversationService, PrismaService, SocketGateway]
})
export class ConversationModule {}
