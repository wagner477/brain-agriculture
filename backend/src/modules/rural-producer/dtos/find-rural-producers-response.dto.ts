import { ApiProperty } from '@nestjs/swagger';
import { RuralProducer } from '@prisma/client';
import { FindRuralProducerResponseDto } from './find-rural-producer-response.dto';

export interface RuralProducerWithIncludes extends Partial<RuralProducer> {}

export class FindRuralProducersResponseDto {
  constructor(
    data: RuralProducerWithIncludes[],
    total: number,
    pageNumber: number,
    pageSize: number,
  ) {
    this.data = data.map((r) => {
      return new FindRuralProducerResponseDto(
        r.id,
        r.name,
        r.document,
        r.createdAt,
        r.updatedAt,
      );
    });
    this.total = total;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }

  @ApiProperty({ type: [FindRuralProducerResponseDto] })
  data: FindRuralProducerResponseDto[];

  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 1 })
  pageNumber: number;

  @ApiProperty({ example: 10 })
  pageSize: number;
}
