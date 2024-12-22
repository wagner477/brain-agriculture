import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsCPFOrCNPJ } from 'brazilian-class-validator';

export class FindAllRuralProducerQueryDto {
  @ApiPropertyOptional({
    description: 'Number of the page',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(100)
  perPage?: number;

  @ApiPropertyOptional({
    description: 'Name of the rural producer',
    example: 'John Doe',
  })
  @IsOptional()
  @Type(() => String)
  name?: string;

  @ApiPropertyOptional({
    description: 'Document of the rural producer',
    example: '12345678901',
  })
  @IsOptional()
  @IsCPFOrCNPJ()
  @Type(() => String)
  document?: string;
}
