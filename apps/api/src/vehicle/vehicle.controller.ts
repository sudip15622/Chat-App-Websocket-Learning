import { Controller, Get, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from 'src/types/types';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Public()
  @Get()
  getAllVehicle(): Vehicle[] {
    return this.vehicleService.findAll();
  }

  @Public()
  @Get(':id')
  getVehicle(@Param('id') vehicleId: string): Vehicle {
    return this.vehicleService.findOne(vehicleId);
  }
}
