import { Module } from '@nestjs/common';
import { RuralProducerService } from './rural-producer.service';
import { RuralProducerController } from './rural-producer.controller';

@Module({
  controllers: [RuralProducerController],
  providers: [RuralProducerService],
})
export class RuralProducerModule {}
