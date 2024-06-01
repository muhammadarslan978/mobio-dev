import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';

import {
  EVENT_ENUM,
  QUEUE_EVENT,
  REPOSITORY,
  SUB_TYPE,
  UserRole,
} from '../../constant/index';
import { Repository } from 'typeorm';
import { IUser, User } from '../database/entity/user';
import { MobileSignupDto, WebSignUpDto } from './dto/user.dto';
import { UtilsService } from '../utils/utils.service';
import { CompanyDetailsService } from './company-details/company-details.service';
import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORY.USER_REPOSITORY) private userRepo: Repository<User>,
    private readonly utilsService: UtilsService,
    private readonly companyDetailService: CompanyDetailsService,
    private readonly rabbitMQService: RabbitMqService,
    private readonly authService: AuthService,
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

      // send email

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
      user = await this.userRepo.save(user);

      const event: QUEUE_EVENT = {
        type: EVENT_ENUM.EMAIL,
        sub_type: SUB_TYPE.SIGNUP,
        data: {
          fullName: user.fullName,
          displayName: user.displayName,
          email: user.email,
          token: await this.authService.generateToken({ id: user.id }),
        },
      };

      // Send notification message
      this.rabbitMQService.send('rabbit-mq-producer', event);

      return user;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verify(token: string): Promise<any> {
    try {
      const decoded = await this.authService.verifyToken(token);
      const user = await this.userRepo.findOne({
        where: { id: decoded.id, verified: false },
      });

      if (!user) {
        throw new HttpException('User not foud', HttpStatus.NOT_FOUND);
      }

      user.verified = true;
      await this.userRepo.save(user);

      return { messge: 'User verified' };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error(err); // Log the error for debugging purposes.
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async resend(token: string): Promise<string> {
  //   try {
  //     return 'msg';
  //   } catch (err) {
  //     if (err instanceof HttpException) {
  //       throw err;
  //     }
  //     console.error(err);
  //     throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}
