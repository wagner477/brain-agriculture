import { BadRequestException } from '@nestjs/common';

export class RuralProducerAlreadyExists extends BadRequestException {
  constructor() {
    super({
      message: 'Rural producer already exists',
      code: 'rural_producer_already_exists',
    });
  }
}
