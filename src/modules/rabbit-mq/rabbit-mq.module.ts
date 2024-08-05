import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RabbitMqService } from './rabbit-mq.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes the ConfigModule available globally
    }),
    ClientsModule.registerAsync([
      {
        name: 'rabbit-mq-module',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'rabbit-mq-nest-js',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {}
