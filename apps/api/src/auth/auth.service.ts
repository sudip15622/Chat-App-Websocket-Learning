import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from 'src/types/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor (
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateJwtUser (email: string) {
    const user = await this.userService.findOne(email);
    return user;
  }

  async login(user: any) {
    const payload: AuthJwtPayload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
