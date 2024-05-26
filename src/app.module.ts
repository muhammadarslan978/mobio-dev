import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { RabbitMQModule } from './modules/rabit-mq/rabit-mq.module';
import { UtilsService } from './modules/utils/utils.service';

@Module({
  imports: [DatabaseModule, UserModule, RabbitMQModule],
  controllers: [],
  providers: [UtilsService],
})
export class AppModule {}
