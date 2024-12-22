import { NotFoundException } from '@nestjs/common';

export class RuralProducerNotFoundException extends NotFoundException {
  constructor() {
    super({
      message: 'Rural producer not found',
      code: 'rural_producer_not_found',
    });
  }
}
