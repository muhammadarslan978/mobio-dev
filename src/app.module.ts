import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { RabbitMQModule } from './modules/rabit-mq/rabit-mq.module';

@Module({
  imports: [DatabaseModule, UserModule, RabbitMQModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
