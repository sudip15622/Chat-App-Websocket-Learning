import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import jwtConfig from '../configs/jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthJwtPayload } from 'src/types/types';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret! as string,
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthJwtPayload) {
    const user = await this.authService.validateJwtUser(payload.sub);
    if(!user) {
        throw new UnauthorizedException("Access denied!");
    }
    return user;
  }
}
