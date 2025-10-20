import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
// import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();

    const token = this.extractTokenFromSocket(client);

    if (!token) {
        throw new WsException('Unauthorized');
    //   return false;
    }

    const payload = await this.jwtService.verifyAsync(token);

    client.data.user = payload;

    return true;
  }

  private extractTokenFromSocket(client: Socket): string | undefined {
    const tokenFromAuth = client.handshake.auth?.token as string;

    return tokenFromAuth;
  }
}
