import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from 'src/types/types';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await hash(password);
    const user = await this.userService.create({
      ...rest,
      password: hashedPassword,
    });
    return await this.login({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (!user || !user?.password) return null;

    const isPasswordMatch = await verify(user.password, password);
    if (!isPasswordMatch) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  }

  async validateJwtUser(email: string) {
    const user = await this.userService.findOne(email);
    if (!user) return null;
    return {
      id: user.id,
    };
  }

  async login(user: any) {
    const payload: AuthJwtPayload = { email: user.email, sub: user.id };
    const { access_token } = await this.generateTokens(payload);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      access_token,
    };
  }

  private async generateTokens(payload: AuthJwtPayload) {
    const [access_token] = await Promise.all([
      this.jwtService.signAsync(payload),
    ]);

    return {
      access_token,
    };
  }
}
