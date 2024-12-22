import { BadRequestException } from '@nestjs/common';

export class DocumentAlreadyExistsException extends BadRequestException {
  constructor() {
    super({
      message: 'Document already exists',
      code: 'document_already_exists',
    });
  }
}
