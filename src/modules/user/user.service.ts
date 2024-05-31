import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { REPOSITORY, UserRole } from '../../constant/index';
import { Repository } from 'typeorm';
import { IUser, User } from '../database/entity/user';
import { MobileSignupDto, WebSignUpDto } from './dto/user.dto';
import { UtilsService } from '../utils/utils.service';
import { CompanyDetailsService } from './company-details/company-details.service';
import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORY.USER_REPOSITORY) private userRepo: Repository<User>,
    private readonly utilsService: UtilsService,
    private readonly companyDetailService: CompanyDetailsService,
    private readonly rabbitMQService: RabbitMqService,
  ) {}
  async webSignup(data: WebSignUpDto): Promise<IUser> {
    try {
      // Check for spaces in displayName
      if (data.displayName.includes(' ')) {
        throw new HttpException(
          'Spaces not allowed in DisplayName.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Check if the user already exists
      const existingUser = await this.userRepo.findOne({
        where: [
          { displayName: data.displayName },
          { email: data.email },
          { companyName: data.companyName },
        ],
      });

      if (existingUser) {
        throw new HttpException(
          'DisplayName, email, or Company Name already taken',
          HttpStatus.CONFLICT,
        );
      }

      // Hash the password
      const hashedPassword = await this.utilsService.generateHash(
        data.password,
      );
      data.password = hashedPassword;

      // Create a domain for the user
      const spaceLessDomain = data.companyName.replace(/\s/g, '');
      data.domain = `${spaceLessDomain}.mobio.com`;

      if (!this.utilsService.isValidDomain(data.domain)) {
        throw new HttpException('Invalid domain name', HttpStatus.BAD_REQUEST);
      }

      let user = new User();
      Object.assign(user, data);
      user.role = UserRole.Organization;

      user = await this.userRepo.save(user);

      await this.companyDetailService.saveCompanyDetails({ user_id: user.id });

      return user;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error(err); // Log the error for debugging purposes.
      throw new HttpException(
        'Failed to create user due to internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async mobileSignup(data: MobileSignupDto): Promise<IUser> {
    try {
      if (data.displayName.includes(' ')) {
        throw new HttpException(
          'Spaces not allowed in DisplayName',
          HttpStatus.BAD_REQUEST,
        );
      }
      const existingUser = await this.userRepo.findOne({
        where: [{ email: data.email }, { displayName: data.displayName }],
      });
      if (existingUser) {
        throw new HttpException('User Already exist', HttpStatus.CONFLICT);
      }
      const hashPassword = await this.utilsService.generateHash(data.password);
      data.password = hashPassword;
      let user = new User();
      Object.assign(user, data);
      user.role = UserRole.Driver;
      // Notify driver
      user = await this.userRepo.save(user);

      // Send notification message
      this.rabbitMQService.send('rabbit-mq-producer', {
        message: 'This is message come from poducer',
      });

      return user;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
