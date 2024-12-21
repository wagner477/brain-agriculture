import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { CryptoHelper, CypherHash } from '@src/common/helpers/crypto.helper';
import { jwtConstants } from '@src/modules/authentication/constants/authentication.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: CypherHash) {
    const decrypted = CryptoHelper.decrypt(payload);

    return JSON.parse(decrypted);
  }
}
