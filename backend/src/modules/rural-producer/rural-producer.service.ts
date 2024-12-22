import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/providers/prisma/prisma.service';
import { CreateRuralProducerDto } from './dtos/create-rural-producer.dto';
import { RuralProducerAlreadyExists } from './exceptions/rural-producer-already-exists.exception';
import { CreateRuralProducerResponseDto } from './dtos/create-rural-producer-response.dto';
import { FindAllRuralProducerQueryDto } from './dtos/find-all-rural-producer-query.dto';
import {
  FindRuralProducersResponseDto,
  RuralProducerWithIncludes,
} from './dtos/find-rural-producers-response.dto';
import { RuralProducerNotFoundException } from './exceptions/rural-producer-not-found.exception';
import { FindRuralProducerResponseDto } from './dtos/find-rural-producer-response.dto';
import { UpdateRuralProducerDto } from './dtos/update-rural-producer.dto';
import { UpdateRuralProducerResponseDto } from './dtos/update-rural-producer-response.dto';

@Injectable()
export class RuralProducerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, query: FindAllRuralProducerQueryDto) {
    const { document, name, page, perPage } = query;

    const { data, pageNumber, pageSize, total } = await this.prisma.paginate(
      'ruralProducer',
      {
        where: {
          userId,
          document: {
            contains: document,
          },
          name: {
            contains: name,
          },
          deletedAt: null,
        },
      },
      page,
      perPage,
    );

    return new FindRuralProducersResponseDto(
      data as RuralProducerWithIncludes[],
      total,
      pageNumber,
      pageSize,
    );
  }

  async findOne(userId: string, id: string) {
    const ruralProducer = await this.prisma.ruralProducer.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!ruralProducer) {
      throw new RuralProducerNotFoundException();
    }

    return new FindRuralProducerResponseDto(
      ruralProducer.id,
      ruralProducer.name,
      ruralProducer.document,
      ruralProducer.createdAt,
      ruralProducer.updatedAt,
    );
  }

  async create(userId: string, data: CreateRuralProducerDto) {
    const documentExists = await this.documentExistsVerify(
      userId,
      data.document,
    );

    if (documentExists) {
      throw new RuralProducerAlreadyExists();
    }

    const ruralProducer = await this.prisma.ruralProducer.create({
      data: {
        ...data,
        userId,
      },
    });

    return new CreateRuralProducerResponseDto(ruralProducer.id);
  }

  async update(userId: string, id: string, data: UpdateRuralProducerDto) {
    const ruralProducer = await this.prisma.ruralProducer.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!ruralProducer) {
      throw new RuralProducerNotFoundException();
    }

    let documentExists = false;

    if (data.document && data.document !== ruralProducer.document) {
      documentExists = await this.documentExistsVerify(userId, data.document);
    }

    if (documentExists) {
      throw new RuralProducerAlreadyExists();
    }

    await this.prisma.ruralProducer.update({
      where: {
        id,
      },
      data,
    });

    return new UpdateRuralProducerResponseDto(id);
  }

  async delete(userId: string, id: string) {
    const ruralProducer = await this.prisma.ruralProducer.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!ruralProducer) {
      throw new RuralProducerNotFoundException();
    }

    await this.prisma.ruralProducer.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  private async documentExistsVerify(userId: string, document: string) {
    const ruralProducer = await this.prisma.ruralProducer.findFirst({
      where: {
        document,
        userId,
      },
    });

    return !!ruralProducer;
  }
}
