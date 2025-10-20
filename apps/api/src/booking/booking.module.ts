import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingGateway } from './booking.gateway';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { BookingController } from './booking.controller';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/auth/configs/jwt.config';

@Module({
  imports: [VehicleModule, JwtModule.registerAsync(jwtConfig.asProvider())],
  controllers: [BookingController],
  providers: [BookingGateway, BookingService],
  exports: [BookingGateway],
})
export class BookingModule {}
