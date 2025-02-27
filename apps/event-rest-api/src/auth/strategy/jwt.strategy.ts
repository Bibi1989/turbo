import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => {
          const data = request?.cookies?.['accessToken'];
          if (!data) {
            throw new UnauthorizedException(
              'You do not have permission to access this api',
            );
          }
          return data;
        },
      ]),
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(_req, payload) {
    const user = await this.authService.getUser(payload?.id);
    if (!user)
      throw new UnauthorizedException('Not authorize to access this api');
    return user;
  }
}
