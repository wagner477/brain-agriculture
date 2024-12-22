import { ApiProperty } from '@nestjs/swagger';

export class FindRuralProducerResponseDto {
  constructor(
    id: string,
    name: string,
    document: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.document = document;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @ApiProperty({
    description: 'Rural producer id',
    example: '2c0dbc17-f8f5-4adc-9e43-c51f1092c553',
  })
  id: string;

  @ApiProperty({
    description: 'Rural producer name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Rural producer document',
    example: '12345678901',
  })
  document: string;

  @ApiProperty({
    description: 'Date of creation',
    example: '2021-09-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of last update',
    example: '2021-09-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
