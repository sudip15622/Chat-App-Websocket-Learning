import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingGateway } from './booking.gateway';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { BookingController } from './booking.controller';

@Module({
  imports: [VehicleModule],
  controllers: [BookingController],
  providers: [BookingGateway, BookingService],
  exports: [BookingGateway],
})
export class BookingModule {}
