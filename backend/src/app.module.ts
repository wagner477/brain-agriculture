import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { JwtAuthGuard } from './modules/authentication/guards/jwt-auth.guard';
import { RolesGuard } from './modules/authentication/guards/roles.guard';
import { PrismaModule } from './providers/prisma/prisma.module';
import { format, transports } from 'winston';

import { WinstonModule } from 'nest-winston';
import { RuralProducerModule } from './modules/rural-producer/rural-producer.module';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => ({
        exitOnError: false,
        format: format.json(),
        transports: [
          new transports.Console({
            format: format.combine(
              format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
              }),
              format.json(),
            ),
          }),
        ],
      }),
    }),

    // oque significa isso?
    // https://docs.nestjs.com/security/authentication#rate-limiting

    PrismaModule,
    AuthenticationModule,
    RuralProducerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
})
export class AppModule {}
