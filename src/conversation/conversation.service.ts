import { Injectable } from '@nestjs/common';
import { Conversation } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { SocketGateway } from './conversation.gateway';
import { RedisRepository } from 'src/redis/redis.repository';

@Injectable()
export class ConversationService {
  constructor(
    private prismaService: PrismaService,
    private socketGateway: SocketGateway,
    private redisService: RedisRepository,
  ) {}
  async sendConversationRequest(
    uniqueId: string,
    messageContent: string,
  ): Promise<{ conversationId: string; initialMessage: any } | null> {
    try {
      const timestamp = new Date().toISOString();

      // Store conversation data in Redis
      const conversationData = await this.redisService.storeData(
        `conversation:${uniqueId}`,
        {
          uniqueId,
          messageContent,
          accepted: false,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      );

      if (!conversationData) {
        // Handle the case where storing data in Redis fails
        return null;
      }

      // Construct the initial message object
      const initialMessage = {
        senderType: 'user', // Assuming the sender is a user for a new conversation request
        content: messageContent,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      // Push the initial message to the conversation's message list in Redis
      await this.redisService.pushToList(
        `conversation:${uniqueId}:messages`,
        JSON.stringify(initialMessage),
      );

      // Add the conversation ID to the set of pending conversation requests
      await this.redisService.addToSet(
        'pendingConversationRequests',
        JSON.stringify({ uniqueId, accepted: false }),
      );

      // Emit WebSocket event
      this.socketGateway.server.emit('conversationRequest', {
        uniqueId,
        messageContent,
      });

      this.socketGateway.server.emit('messageCreated', {
        uniqueId,
        messageContent,
      });

      // Return the ID and initial message
      return { conversationId: uniqueId, initialMessage };
    } catch (error) {
      // Handle errors
      console.error('Error sending conversation request:', error);
      return null;
    }
  }
  async continueConversation(
    conversationId: string,
    senderType: 'user' | 'admin',
    messageContent: string,
  ) {
    try {
      const timestamp = new Date().toISOString();

      // Construct the message object with timestamps
      const message = {
        senderType,
        content: messageContent,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      // Push the message to the conversation's message list in Redis
      const result = await this.redisService.pushToList(
        `conversation:${conversationId}:messages`,
        JSON.stringify(message),
      );

      // Emit WebSocket event
      this.socketGateway.server.emit('messageCreated', {
        conversationId,
        message,
      });
    } catch (error) {
      // Handle errors
      console.error('Error continuing conversation:', error);
    }
  }

  async getAcceptedConversations(adminId: number) {
    try {
      // Get the IDs of accepted conversations from Redis
      const acceptedConversationIds = await this.redisService.getSetMembers(
        `acceptedConversations:${adminId}`,
      );

      // Fetch conversation details for each accepted conversation ID
      const acceptedConversations = await Promise.all(
        acceptedConversationIds.map(async (conversationId: string) => {
          try {
            // Retrieve conversation details from Redis using the conversation ID
            const conversationData = await this.redisService.retrieveData(
              `conversation:${conversationId}`,
            );

            // Check if the retrieved data is valid
            if (
              typeof conversationData === 'object' &&
              conversationData !== null &&
              conversationData.hasOwnProperty('updatedAt') // Check if updatedAt exists
            ) {
              // Retrieve all messages associated with the conversation ID
              const conversationMessages = await this.redisService.getListItems(
                `conversation:${conversationId}:messages`,
              );
              // Parse each message from JSON string to object
              const parsedMessages = conversationMessages.map((message) =>
                JSON.parse(message),
              );

              // Add parsed messages to conversation data
              const updatedConversationData = {
                ...conversationData,
                messages: parsedMessages,
              };

              return updatedConversationData;
            } else {
              // Log an error if the retrieved data is not valid
              console.error(
                'Invalid or missing conversation data:',
                conversationData,
              );
              return null;
            }
          } catch (error) {
            // Handle parsing errors or unexpected data format
            console.error('Error retrieving conversation data:', error);
            return null;
          }
        }),
      );

      // Filter out conversations with null values
      const filteredConversations = acceptedConversations.filter(
        (conversation) => conversation !== null,
      );

      return filteredConversations;
    } catch (error) {
      // Handle overall error
      console.error('Error fetching accepted conversations:', error);
      return [];
    }
  }
  async acceptConversationRequest(conversationId: string, adminId: number) {
    // Remove the conversation ID from the set of pending conversation requests
    await this.redisService.removeFromSet(
      'pendingConversationRequests',
      JSON.stringify({ uniqueId: conversationId, accepted: false }),
    );

    // Mark the conversation as accepted in Redis
    await this.redisService.addToSet(
      `acceptedConversations:${adminId}`,
      conversationId.toString(),
    );

    // Retrieve existing conversation data from Redis
    const conversationData = await this.redisService.retrieveData(
      `conversation:${conversationId}`,
    );

    if (conversationData) {
      // Update the conversation data in Redis to mark it as accepted
      conversationData.accepted = true;
      conversationData.adminId = adminId;
      await this.redisService.storeData(
        `conversation:${conversationId}`,
        conversationData,
      );

      return { id: conversationId, accepted: true, adminId };
    } else {
      // Conversation data not found in Redis
      // Handle this case accordingly
      return null;
    }
  }
  async getPendingConversationRequests() {
    try {
      // Get the data of pending conversation requests from Redis
      const pendingConversationData = await this.redisService.getSetMembers(
        'pendingConversationRequests',
      );

      // Parse the data, extract the uniqueId and accepted values, and filter out the ones with accepted set to false
      const pendingConversations = pendingConversationData
        .map((conversationStr) => JSON.parse(conversationStr))
        .filter(({ accepted }) => accepted === false);

      // Return the pending conversations
      return pendingConversations;
    } catch (error) {
      // Handle errors
      console.error('Error retrieving pending conversation requests:', error);
      return [];
    }
  }
  async getAllMessagesInConversation(conversationId: string) {
    // Fetch all messages for a conversation from Redis
    const messages = await this.redisService.getListItems(
      `conversation:${conversationId}:messages`,
    );

    // Parse each message string into a JavaScript object
    const parsedMessages = messages.map((message) => JSON.parse(message));

    return parsedMessages;
  }
}
