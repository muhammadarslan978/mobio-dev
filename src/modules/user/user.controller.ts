import {
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WebSignUpDto, MobileSignupDto } from './dto/user.dto';
import { UserService } from './user.service';
import { IUser } from '../database/entity/user';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/web/signup')
  @ApiOperation({ summary: 'Web user signup' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.' })
  @UsePipes(new ValidationPipe())
  async webSignUp(@Body() body: WebSignUpDto): Promise<IUser> {
    return this.userService.webSignup(body);
  }

  @Post('/mobile/signup')
  @ApiOperation({ summary: 'Mobile user signup' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.' })
  @UsePipes(new ValidationPipe())
  async mobileSignUp(@Body() body: MobileSignupDto): Promise<IUser> {
    return this.userService.mobileSignup(body);
  }

  @Get('/verify/:JWT')
  @ApiOperation({ summary: 'Mobio verify user api' })
  @ApiResponse({
    status: 200,
    description: 'Verified',
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @UsePipes(new ValidationPipe())
  async verify(@Param('JWT') token: string): Promise<string> {
    try {
      console.log(token);
      return 'Verified';
    } catch (error) {
      throw new Error('Invalid input');
    }
  }

  @Get('/resend/:JWT')
  @ApiOperation({ summary: 'Mobio resend verification api' })
  @ApiResponse({
    status: 200,
    description:
      'Verification link send to your email please verify your account',
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @UsePipes(new ValidationPipe())
  async resend(@Param('JWT') token: string): Promise<string> {
    try {
      console.log(token);
      return 'Verification link send to your email please verify your account';
    } catch (error) {
      throw new Error('Invalid input');
    }
  }
}
