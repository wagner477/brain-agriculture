import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

type ModelType<T> = T extends keyof PrismaClient ? PrismaClient[T] : never;
type ModelName<T extends keyof PrismaClient> = T;
type ModelWhere<T extends keyof PrismaClient> = PrismaClient[T] extends {
  findMany: (args: infer U) => any;
}
  ? U extends { where?: infer W }
    ? W
    : never
  : never;
type ModelOrderBy<T extends keyof PrismaClient> = PrismaClient[T] extends {
  findMany: (args: infer U) => any;
}
  ? U extends { orderBy?: infer O }
    ? O
    : never
  : never;
type ModelSelect<T extends keyof PrismaClient> = PrismaClient[T] extends {
  findMany: (args: infer U) => any;
}
  ? U extends { select?: infer S }
    ? S
    : never
  : never;

type ModelInclude<T extends keyof PrismaClient> = PrismaClient[T] extends {
  findMany: (args: infer U) => any;
}
  ? U extends { include?: infer I }
    ? I
    : never
  : never;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }

  async paginate<T extends keyof PrismaClient>(
    model: ModelName<T>,
    options?: {
      where?: ModelWhere<T>;
      orderBy?: ModelOrderBy<T>;
      select?: ModelSelect<T>;
      include?: ModelInclude<T>;
    },
    pageNumber = 1,
    pageSize = 10,
  ): Promise<{
    data: ModelType<T>[];
    total: number;
    pageNumber: number;
    pageSize: number;
  }> {
    try {
      pageSize = isNaN(pageSize) || pageSize === 0 ? 10 : pageSize;
      pageNumber = isNaN(pageNumber) || pageNumber === 0 ? 1 : pageNumber;

      const prisma = new PrismaClient();
      const skip = (pageNumber - 1) * Number(pageSize);
      const take = Number(pageSize);

      // @ts-ignore
      const [data, total] = await Promise.all([
        // @ts-ignore
        prisma[model].findMany({ skip, take, ...options }),
        // @ts-ignore
        prisma[model].count({ where: options?.where }),
      ]);

      prisma.$disconnect();

      return { data, total, pageNumber, pageSize };
    } catch (error) {
      console.log(error);
    }
  }
}
