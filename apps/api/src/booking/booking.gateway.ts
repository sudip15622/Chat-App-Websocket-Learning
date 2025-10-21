import { Inject, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { WsJwtGuard } from 'src/auth/guards/ws-jwt-auth.guard';
import { Vehicle } from 'src/types/types';
import { VehicleService } from 'src/vehicle/vehicle.service';

@WebSocketGateway(3001, {
  namespace: 'booking',
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class BookingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{ 
  constructor(
    private readonly vehicleService: VehicleService,
    private jwtService: JwtService,
  ) {}

  @WebSocketServer()
  namespace: Namespace;

  afterInit() {
    this.namespace.use(async(socket, next) => {
      const token = socket.handshake.auth.token;

      if(!token) {
        return next(new Error("Authentication token missing!"));
      }

      try {
        const payload = await this.jwtService.verifyAsync(token);
        console.log(payload);
        // console.log(payload);
        (socket as any).user = payload
        next();
      } catch (error) {
        console.log('Invalid token!');
        next(new Error('Invalid token!'));
      }
    })
  }

  // getServer() {
  //   return this.namespace.server;
  // }

  private connectedClients: Record<string, string>;

  @UseGuards(WsJwtGuard)
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() vehicleId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = `Room_Vehicle_${vehicleId}`;
    client.join(roomName);
  }

  broadcastStatusChange(vehicle: Vehicle) {
    const roomName = `Room_Vehicle_${vehicle.id}`;

    this.namespace.to(roomName).emit('vehicleStatusChanged', {
      vehicleId: vehicle.id,
      status: vehicle.status,
    });
  }
}
