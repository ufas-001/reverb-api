import { Injectable } from '@nestjs/common';
import { Conversation } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { SocketGateway } from './conversation.gateway';

@Injectable()
export class ConversationService {
  constructor(private prismaService:PrismaService, private socketGateway: SocketGateway){}
    async sendConversationRequest(uniqueId: string, messageContent: string) {
        const chatUser = await this.prismaService.chatUser.upsert({
            where: { uniqueId: uniqueId },
            create: { uniqueId: uniqueId },
            update: {}, // Provide an empty object for the update property
        });
    
        const conversation = await this.prismaService.conversation.create({
            data: {
                chatUser: { connect: { id: chatUser.id } },
                messages: {
                    create: [{
                        content: messageContent,
                        senderType: 'user',
                        
                    }],
                },
            },
            include: { messages: true, chatUser: true },
        });

        this.socketGateway.server.emit('conversationRequest', { conversation });
    
        return conversation;
    }
    
    async continueConversation(conversationId: number, senderType: 'user' | 'admin',  messageContent: string) {
        const message = await this.prismaService.message.create({
          data: {
            conversationId,
            senderType,
            content: messageContent
          }
        });
         // Emit a WebSocket event to notify clients about the new message
        this.socketGateway.server.emit('messageCreated', message);

        return message;
    }
    
    async getAcceptedConversations(adminId: number) {
        const acceptedConversations = await this.prismaService.conversation.findMany({
          where: {
            accepted: true,
            adminId
          },
          include: { chatUser: true, messages: true },
        });
    
        return acceptedConversations;
    }
    
  async acceptConversationRequest(conversationId: number, adminId: number) {
      const conversation = await this.prismaService.conversation.update({
        where: { id: conversationId },
        data: {
          accepted: true,
          adminId
        }
      });
  
      return conversation;
  }

  async getPendingConversationRequests(): Promise<Conversation[]> {
      return this.prismaService.conversation.findMany({
        where: { accepted: false }, // Fetch conversations where accepted is false
      });
  }
  async getAllMessagesInConversation(conversationId: number) {
      const messages = await this.prismaService.message.findMany({
          where: {
              conversationId: conversationId,
          },
      });
      return messages;
  }
}
