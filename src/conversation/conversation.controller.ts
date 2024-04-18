import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
    constructor(private conversationService:ConversationService){}
    @Post('request')
    async sendConversationRequest(@Body() body: any) {
      const { uniqueId, messageContent } = body;
      const conversation = await this.conversationService.sendConversationRequest(uniqueId, messageContent);
      return conversation;
    }

    @Post(':conversationId/continue')
    async continueConversation(@Body() body: any, @Param('conversationId') conversationId: string) {
      const { senderType, senderId, messageContent } = body;
      const message = await this.conversationService.continueConversation(conversationId, senderType, messageContent);
      return message;
    }

    @Get('accepted/:adminId')
    async getAcceptedConversations(@Param('adminId') adminId: number) {
      return this.conversationService.getAcceptedConversations(adminId);
    }

    @Post('accept')
    async acceptConversationRequest(@Body() body: any) {
      const { conversationId, adminId } = body;
      const conversation = await this.conversationService.acceptConversationRequest(conversationId, adminId);
      return conversation;
    }
    @Get('/pending')
    async getPendingConversationRequests() {
      return this.conversationService.getPendingConversationRequests();
    }
    @Get("messages/:conversationId")
    async getAllConversationMessages(@Param('conversationId') conversationId: string) {
      const messages = await this.conversationService.getAllMessagesInConversation(conversationId)
      return messages
    }
}
