import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
// import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if(isPublic) {
      return true;
    }
    
    const client: Socket = context.switchToWs().getClient<Socket>();

    const token = this.extractTokenFromSocket(client);

    if (!token) {
      throw new WsException('Unauthorized');
      //   return false;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      client.data.user = payload;

      return true;
    } catch (error) {
      throw new WsException("Unauthorized");
    }
  }

  private extractTokenFromSocket(client: Socket): string | undefined {
    const tokenFromAuth = client.handshake.auth?.token as string;

    return tokenFromAuth;
  }
}
