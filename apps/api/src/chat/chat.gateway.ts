import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Namespace, Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { from, map, Observable } from 'rxjs';

@WebSocketGateway(90, {
  cors: {origin: "*"}
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // @WebSocketServer()
  // server: Server; // THis is either a Namespace instance (if namespace is set in gateway) or Server instance if not.

  //better way to do this if namespace is being used in gateway.
  // @WebSocketServer()
  // namespace: Namespace;

  // now get the server like this;
  // getServer(): Server {
  //   return this.namespace.server;
  // }
  // constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;
  private connectedClients = new Map<string, number>();

  handleConnection(client: Socket) {
    console.log(`Client: ${client.id} connected!`);

    const userId = this.getUserIdFromHandshake(client);
    if (userId) {
      this.connectedClients.set(client.id, userId);
      console.log(`User ${userId} connected!`);

      client.emit('success', {
        message: 'Connected Successfully!',
        userId,
      });
    } else {
      console.log('Anonymous connection, disconnecting...');
      client.emit('error', { message: 'UserId required' });
      client.disconnect();
    }
  }
  handleDisconnect(client: Socket) {
    console.log(`Client : ${client.id} disconnected!`);
    const userId = this.connectedClients.get(client.id);
    if (userId) {
      this.connectedClients.delete(client.id);
      console.log(`User: ${userId} removed!`);
    }
  }

  private getUserIdFromHandshake(client: Socket): number | null {
    const userId = client.handshake.query.userId;
    return userId ? Number(userId) : null;
  }

  sendToUser(userId: number, event: string, payload: any): boolean {
    let messageSent = false;
    for (const [socketId, uid] of this.connectedClients.entries()) {
      if (uid === userId) {
        this.server.to(socketId).emit(event, payload);
        console.log(`Message sent to user ${userId} on socket ${socketId}`);
        messageSent = true;
      }
    }
    if (!messageSent) {
      console.log(`User ${userId} is not connected!`);
    }

    return messageSent;
  }


  // listening to event
  // @SubscribeMessage("newChat")
  // handleChat(
  //   @MessageBody() data: string,
  //   @ConnectedSocket() client: Socket,
  // ): string {
  //   // return the acknowledgement
  //   return data;
  // }

  // @SubscribeMessage('newChat')
  // handleChat(@MessageBody() body: unknown): WsResponse<unknown> {
  //   const chat = 'newChat';
  //   console.log(body);
  //   return { event: chat, data: body };
  // }

  //Multiple responses
  // @SubscribeMessage('event')
  // handleEvent(@MessageBody() data: unknown): Observable<WsResponse<string>> {
  //   const event = 'events';
  //   const resonse = [
  //     'Hello, dear',
  //     'I wanna say something.',
  //     'I love you so much!',
  //   ];

  //   return from(resonse).pipe(map((data) => ({ event, data })));
  // }
}
