import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
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
import { FindAllRuralProducerQueryDto } from './dtos/find-all-rural-producer-query.dto';
import { FindRuralProducersResponseDto } from './dtos/find-rural-producers-response.dto';
import { FindRuralProducerResponseDto } from './dtos/find-rural-producer-response.dto';
import { UpdateRuralProducerResponseDto } from './dtos/update-rural-producer-response.dto';
import { CreateRuralProducerResponseDto } from './dtos/create-rural-producer-response.dto';

@ApiTags('Rural Producer')
@Controller('rural-producer')
@ApiBearerAuth('authorization')
export class RuralProducerController {
  constructor(private readonly ruralProducerService: RuralProducerService) {}

  @ApiOperation({
    summary: 'Find all rural producers.',
    description: 'Find all rural producers.',
  })
  @ApiOkResponse({
    description: 'Rural producers found successfully.',
    type: FindRuralProducersResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Caso não haja uma sessão válida.',
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
  })
  @Get('/')
  async findAll(
    @User() user: UserSession,
    @Query() query: FindAllRuralProducerQueryDto,
  ) {
    return this.ruralProducerService.findAll(user.id, query);
  }

  @ApiOperation({
    summary: 'Find a rural producer by id.',
    description: 'Find a rural producer by id.',
  })
  @ApiOkResponse({
    description: 'Rural producer found successfully.',
    type: FindRuralProducerResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Caso não haja uma sessão válida.',
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
  })
  @Get('/:id')
  async findOne(@User() user: UserSession, @Param('id') id: string) {
    return this.ruralProducerService.findOne(user.id, id);
  }

  @ApiOperation({
    summary: 'Create a new rural producer.',
    description: 'Create a new rural producer.',
  })
  @ApiOkResponse({
    description: 'Rural producer created successfully.',
    type: CreateRuralProducerResponseDto,
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

  @ApiOperation({
    summary: 'Update a rural producer.',
    description: 'Update a rural producer.',
  })
  @ApiOkResponse({
    description: 'Rural producer updated successfully.',
    type: UpdateRuralProducerResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Caso não haja uma sessão válida.',
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
  })
  @Put('/:id')
  async update(
    @User() user: UserSession,
    @Param('id') id: string,
    @Body() data: CreateRuralProducerDto,
  ) {
    return this.ruralProducerService.update(user.id, id, data);
  }
}
