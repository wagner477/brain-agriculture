import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '@src/modules/authentication/constants/authentication.constants';
import { LocalAuthGuard } from '@src/modules/authentication/guards/local-auth.guard';

import { AuthenticationService, UserSession } from './authentication.service';
import { User } from '@src/common/decorators/user.decorators';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    schema: {
      example: {
        username: 'admin@admin.com',
        password: 'admin',
      },
    },
  })
  async login(@User() user: UserSession) {
    return await this.authenticationService.createJwtToken(user);
  }

  @ApiBearerAuth('authorization')
  @Get('is-authenticated')
  isAuthenticated() {
    return true;
  }
}
