import { Module } from '@nestjs/common';
import { HealthController } from './controller/controller.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
