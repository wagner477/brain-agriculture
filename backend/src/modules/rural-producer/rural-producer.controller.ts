import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { RuralProducerService } from './rural-producer.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateRuralProducerDto } from './dtos/create-rural-producer.dto';
import { User } from '@src/common/decorators/user.decorators';
import { UserSession } from '../authentication/authentication.service';
import { RuralProducerAlreadyExists } from './exceptions/rural-producer-already-exists.exception';

@ApiTags('Rural Producer')
@Controller('rural-producer')
@ApiBearerAuth('authorization')
export class RuralProducerController {
  constructor(private readonly ruralProducerService: RuralProducerService) {}

  @ApiOperation({
    summary: 'Create a new rural producer.',
    description: 'Create a new rural producer.',
  })
  @ApiOkResponse({
    description: 'Rural producer created successfully.',
    schema: {
      example: {
        id: '1',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Rural producer already exists.',
    schema: {
      example: new RuralProducerAlreadyExists().getResponse(),
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Caso não haja uma sessão válida.',
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
  })
  @Post('/')
  async create(
    @User() user: UserSession,
    @Body() data: CreateRuralProducerDto,
  ) {
    return this.ruralProducerService.create(user.id, data);
  }
}
