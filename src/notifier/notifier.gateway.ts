import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

type QuoteCreatedEvent = {
  quote: string;
};

@WebSocketGateway({ cors: '*' })
export class NotifierGateway implements OnModuleInit {
  private readonly DefaultRoom = 'default room';

  @WebSocketServer()
  server: Server;

  onModuleInit(): void {
    this.server.on('connection', (socket) => {
      try {
        socket.join(this.DefaultRoom);
      } catch (error) {
        throw new WsException(error);
      }
    });
  }

  @OnEvent('quote.created')
  async sendNotifications(payload: QuoteCreatedEvent): Promise<void> {
    try {
      const { quote } = payload;
      this.server.to(this.DefaultRoom).emit('onNewQuote', quote);
    } catch (error) {
      throw new WsException(error);
    }
  }
}
