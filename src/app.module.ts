import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { UtilsService } from './modules/utils/utils.service';
import { RabbitMqModule } from './modules/rabbit-mq/rabbit-mq.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,
    UserModule,
    RabbitMqModule,
    AuthModule,
  ],
  controllers: [],
  providers: [UtilsService],
})
export class AppModule {}
