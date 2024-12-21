import { PartialType } from '@nestjs/swagger';
import { CreateRuralProducerDto } from './create-rural-producer.dto';

export class UpdateRuralProducerDto extends PartialType(
  CreateRuralProducerDto,
) {}
