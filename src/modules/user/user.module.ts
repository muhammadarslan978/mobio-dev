import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { DatabaseModule } from '../database/database.module';
import { UtilsService } from '../utils/utils.service';
import { CompanyDetailsService } from './company-details/company-details.service';
import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';
import { AuthModule } from '../auth/auth.module';
import { OnbordingService } from './onbording/onbording.service';
import { UserService } from './service/user.service';

@Module({
  imports: [DatabaseModule, RabbitMqModule, AuthModule],
  controllers: [UserController],
  providers: [
    UserService,
    UtilsService,
    CompanyDetailsService,
    OnbordingService,
  ],
})
export class UserModule {}
