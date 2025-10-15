import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingGateway } from './booking.gateway';
import { CreateBookingDto } from 'src/types/types';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Injectable()
export class BookingService {

    constructor (private vehicleService: VehicleService) {}

    create(createBookingDto: CreateBookingDto) {
        return this.vehicleService.bookVehicle(createBookingDto.vehicleId);
    }
}
