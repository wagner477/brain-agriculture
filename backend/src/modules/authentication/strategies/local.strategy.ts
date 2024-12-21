import { Request } from 'express';
import { Strategy } from 'passport-local';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, email: string, password: string) {
    return await this.authenticationService.checkEmailAndPassword(
      email,
      password,
    );
  }
}
