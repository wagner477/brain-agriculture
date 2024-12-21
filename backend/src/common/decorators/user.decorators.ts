import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserSession } from '@src/modules/authentication/authentication.service';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserSession => {
    const { user } = ctx.switchToHttp().getRequest();

    return user;
  },
);
