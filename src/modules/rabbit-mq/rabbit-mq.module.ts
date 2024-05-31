import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RabbitMqService } from './rabbit-mq.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'rabbit-mq-module',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
          queue: 'rabbit-mq-nest-js',
        },
      },
    ]),
  ],
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {}
