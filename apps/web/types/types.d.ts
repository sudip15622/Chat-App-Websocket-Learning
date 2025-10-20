import { JWTPayload } from "jose";

export interface Vehicle {
  id: string;
  name: string;
  status: 'available' | 'booked' | 'locked';
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface CustomFormState {
  success: boolean;
  message: string;
}

export interface SessionPayload extends JWTPayload {
  access_token: string;
}