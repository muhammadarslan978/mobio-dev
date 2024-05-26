import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { UtilsService } from '../utils/utils.service';
import { CompanyDetailsService } from './company-details/company-details.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    UtilsService,
    CompanyDetailsService,
    CompanyDetailsService,
  ],
})
export class UserModule {}
