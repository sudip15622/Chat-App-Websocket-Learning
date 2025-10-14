import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { VehicleService } from 'src/vehicle/vehicle.service';

@WebSocketGateway(3001, {
  namespace: 'booking',
  cors: {
    origin: "http://localhost:3000"
  }
})
export class BookingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly vehicleService: VehicleService) {}

  @WebSocketServer()
  namespace: Namespace;

  // getServer() {
  //   return this.namespace.server;
  // }

  private connectedClients: Record<string, string>;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    // this.connectedClients[client.id] = `User-${client.id}`;

    // console.log(
    //   'Connected Clients:',
    //   Object.keys(this.connectedClients).length,
    // );
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    // Clean up
    // delete this.connectedClients[client.id];
    // console.log(
    //   'Remaining Clients:',
    //   Object.keys(this.connectedClients).length,
    // );
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() vehicleId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = `Room_Vehicle_${vehicleId}`;
    client.join(roomName);

    console.log(`Client - ${client.id} joins Room - ${roomName}`);
  }

  @SubscribeMessage("bookVehicle") 
  handleBooking (
    @MessageBody() vehicleId: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Client: ${client.id} requested to book vehicle: ${vehicleId}`);

    const roomName = `Room_Vehicle_${vehicleId}`;

    let vehicle = this.vehicleService.findOne(vehicleId);
    if(vehicle.status === "booked") {
      client.emit("bookingError", {
        message: "Vehicle is already booked by another user!",
      })
      return false;
    }

    const updatedVehicle = this.vehicleService.updateOne(vehicleId, "booked");
    // console.log(updatedVehicle);

    this.namespace.to(roomName).emit("vehicleStatusChanged", {
      message: "Vehicle status updated!",
      vehicleId: updatedVehicle.id,
      status: updatedVehicle.status
    })

    client.emit("bookingSuccess", {
      message: "Booking successful!",
    })
  }

  // notifyBookingStatus (roomName: string, event: string, payload: any) {
  //   return this.server.to(roomName).emit(event, payload);
  // }
}
