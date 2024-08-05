import {
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  WebSignUpDto,
  MobileSignupDto,
  MobileLoginDto,
  WebLoginDto,
} from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { IUser } from '../../database/entity/user';
import { OnboardingDto, UpdateOnboardingDto } from '../dto/onbording.dto';
import { Roles } from '../../auth/roles.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { UserRole } from 'src/constant';
import { IOnBoarding } from '../../database/entity/onBording';
import { MessageResponse } from '../interface/interface';

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
  async verify(@Param('JWT') token: string): Promise<any> {
    return this.userService.verify(token);
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
      return this.userService.resend(token);
    } catch (error) {
      throw new Error('Invalid input');
    }
  }

  @Post('/mobile/login')
  @ApiOperation({ summary: 'Mobile user Login' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully login',
  })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.' })
  @UsePipes(new ValidationPipe())
  async mobileLogin(@Body() body: MobileLoginDto): Promise<any> {
    return this.userService.mobileLogin(body);
  }

  @Post('/web/login')
  @ApiOperation({ summary: 'Web user Login' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully login',
  })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.' })
  @UsePipes(new ValidationPipe())
  async webLogin(@Body() body: WebLoginDto): Promise<any> {
    return this.userService.webLogin(body);
  }

  @Post('/onboarding')
  @ApiOperation({ summary: 'Add onboarding for driver' })
  @ApiResponse({
    status: 201,
    description: 'User has successfully added onboarding',
  })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.' })
  @ApiBearerAuth('access-token') // Use the security scheme name defined in DocumentBuilder
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Driver, UserRole.Dispatcher)
  @UsePipes(new ValidationPipe())
  async userOnboarding(
    @Req() req: any,
    @Body() body: OnboardingDto,
  ): Promise<MessageResponse> {
    return this.userService.addOnBording(body, req.user.id);
  }

  @Get('/onboarding')
  @ApiOperation({ summary: 'Driver or Dispatcher get his own onboarding' })
  @ApiResponse({
    status: 200,
    description: 'Driver get his own onboarding',
  })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.' })
  @ApiBearerAuth('access-token') // Use the security scheme name defined in DocumentBuilder
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Driver, UserRole.Dispatcher)
  async getUserOnboarding(@Req() req: any): Promise<IOnBoarding> {
    return this.userService.getOnBoarding(req.user.id);
  }

  @Put('/onboarding')
  @ApiOperation({ summary: 'This api is use to update onboarding' })
  @ApiResponse({
    status: 201,
    description: 'User has successfully update onboarding',
  })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.' })
  @ApiBearerAuth('access-token') // Use the security scheme name defined in DocumentBuilder
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Driver, UserRole.Dispatcher)
  @UsePipes(new ValidationPipe())
  async updateOnBording(
    @Req() req: any,
    @Body() body: UpdateOnboardingDto,
  ): Promise<MessageResponse> {
    return this.userService.updateOnboarding(body, req.user.id);
  }
}
