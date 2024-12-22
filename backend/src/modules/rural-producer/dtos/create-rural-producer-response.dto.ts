import { ApiProperty } from '@nestjs/swagger';

export class CreateRuralProducerResponseDto {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    description: 'Rural producer id',
    example: '2c0dbc17-f8f5-4adc-9e43-c51f1092c553',
  })
  id: string;
}
