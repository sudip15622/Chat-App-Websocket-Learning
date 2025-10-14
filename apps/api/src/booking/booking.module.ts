import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingGateway } from './booking.gateway';
import { VehicleModule } from 'src/vehicle/vehicle.module';

@Module({
  imports: [VehicleModule],
  providers: [BookingGateway, BookingService],
  exports: [BookingGateway],
})
export class BookingModule {}
