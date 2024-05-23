import {
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WebSignUpDto, MobileSignupDto } from './dto/user.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor() {}

  @Post('/web/signup')
  @ApiOperation({ summary: 'Web user signup' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.' })
  @UsePipes(new ValidationPipe())
  async webSignUp(@Body() body: WebSignUpDto): Promise<void> {
    console.log(body);
  }

  @Post('/mobile/signup')
  @ApiOperation({ summary: 'Mobile user signup' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.' })
  @UsePipes(new ValidationPipe())
  async mobileSignUp(@Body() body: MobileSignupDto): Promise<void> {
    console.log(body);
  }
}
