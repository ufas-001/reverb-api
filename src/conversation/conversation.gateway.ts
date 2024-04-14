import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: "*",
  }
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
}
