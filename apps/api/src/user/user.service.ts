import { Injectable } from '@nestjs/common';
import { User } from 'src/types/types';

@Injectable()
export class UserService {

    private users: User[] = [
    {
      id: "1",
      name: "Sudip Lamichhane",
      email: 'sudip@gmail.com',
      password: 'sudip15622',
    },
    {
      id: "2",
      name: "Ayush Pandey",
      email: 'ayush@gmail.com',
      password: 'ayush15622',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}
