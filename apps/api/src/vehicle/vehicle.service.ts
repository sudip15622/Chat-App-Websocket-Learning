import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Vehicle } from 'src/types/types';

@Injectable()
export class VehicleService {
  private vehicles: Vehicle[] = [
    {
      id: '1',
      name: 'Yamaha',
      status: 'available',
    },
    {
      id: '2',
      name: 'Honda',
      status: 'available',
    },
    {
      id: '3',
      name: 'Bullet',
      status: 'available',
    },
  ];

  findAll(): Vehicle[] {
    return this.vehicles;
  }

  findOne(id: string): Vehicle {
    const vehicle = this.vehicles.find((v) => v.id === id);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found!');
    }
    return vehicle;
  }

  bookVehicle(id: string): Vehicle {
    const vehicle = this.vehicles.find((v) => v.id === id);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found!');
    }
    if(vehicle.status === "booked") {
      throw new ConflictException("This vehicle is already booked!");
    } 

    vehicle.status = "booked";

    return vehicle;
  }
}
