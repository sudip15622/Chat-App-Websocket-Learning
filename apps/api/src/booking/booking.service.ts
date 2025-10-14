import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingGateway } from './booking.gateway';
import { Booking } from 'src/types/types';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Injectable()
export class BookingService {
}
