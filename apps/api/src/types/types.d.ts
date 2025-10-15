export interface Vehicle {
  id: string;
  name: string;
  status: 'available' | 'booked';
}

export interface CreateBookingDto {
  // id: string;
  vehicleId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface AuthJwtPayload {
  sub: string;
  email: string;
}