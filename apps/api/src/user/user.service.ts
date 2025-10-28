import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/auth/database/prisma.service';
import { User } from 'src/types/types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userCreateInput: Prisma.UserCreateInput) {
    return await this.prisma.client.user.create({
      data: userCreateInput,
    });
  }

  async findOne(email: string) {
    return await this.prisma.client.user.findUnique({
      where: { email: email },
    });
  }
  async findOneById(id: string) {
    return await this.prisma.client.user.findUnique({
      where: { id: id },
    });
  }
}
