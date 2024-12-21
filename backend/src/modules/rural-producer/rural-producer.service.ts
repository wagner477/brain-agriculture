import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/providers/prisma/prisma.service';
import { CreateRuralProducerDto } from './dtos/create-rural-producer.dto';
import { RuralProducerAlreadyExists } from './exceptions/rural-producer-already-exists.exception';

@Injectable()
export class RuralProducerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: CreateRuralProducerDto) {
    const ruralProducerAlreadyExists =
      await this.prisma.ruralProducer.findFirst({
        where: {
          document: data.document,
        },
      });

    if (ruralProducerAlreadyExists) {
      throw new RuralProducerAlreadyExists();
    }

    const ruralProducer = await this.prisma.ruralProducer.create({
      data: {
        ...data,
        userId,
      },
    });

    return {
      id: ruralProducer.id,
    };
  }
}
