export interface Vehicle {
  id: string;
  name: string;
  status: 'available' | 'booked' | 'locked';
}
