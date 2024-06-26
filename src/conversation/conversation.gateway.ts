import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;

  // Method to handle sending conversation requests
  sendConversationRequest(conversation: any) {
    this.server.emit('conversationRequest', conversation);
  }

  emitMessageCreatedEvent(message: any) {
    this.server.emit('messageCreated', message);
  }

  // Add more methods to handle other Socket.IO events if needed
  @SubscribeMessage('typing')
  handleTyping(
    client: Socket,
    payload: { conversationId: string; senderType: 'user' | 'admin' },
  ) {
    console.log(
      `Received typing event from ${payload.senderType} for conversation ${payload.conversationId}`,
    );
    this.server.emit(`userTyping:${payload.conversationId}`, {
      senderType: payload.senderType,
    });
    console.log(
      `Emitted userTyping event for conversation ${payload.conversationId}`,
    );
  }
}
