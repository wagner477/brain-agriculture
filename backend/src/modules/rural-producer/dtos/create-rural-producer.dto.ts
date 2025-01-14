import { ApiProperty } from '@nestjs/swagger';
import { IsCPFOrCNPJ } from 'brazilian-class-validator';
import { IsString, ValidateIf } from 'class-validator';

export class CreateRuralProducerDto {
  @ApiProperty({
    description: 'Name of the rural producer',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Document of the rural producer',
    example: '123.456.789-00',
  })
  @ValidateIf((_, value) => value !== undefined)
  @IsCPFOrCNPJ()
  document: string;
}
