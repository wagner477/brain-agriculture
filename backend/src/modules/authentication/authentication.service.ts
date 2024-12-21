import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { CryptoHelper } from '@src/common/helpers/crypto.helper';
import { PasswordHelper } from '@src/common/helpers/password.helper';
import { PrismaService } from '@src/providers/prisma/prisma.service';

export type UserSession = { id: string; roles: UserRole[] };

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async checkUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<UserSession> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: username,
          },
          {
            username,
          },
        ],
      },
      select: {
        id: true,
        password: true,
        roles: true,
      },
    });

    try {
      if (!user) throw new UnauthorizedException();

      const isEqual = await PasswordHelper.compare(password, user.password);

      if (!isEqual) throw new UnauthorizedException();

      delete user.password;

      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async createJwtToken(user: UserSession) {
    const payload = CryptoHelper.encrypt(JSON.stringify(user));
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}
