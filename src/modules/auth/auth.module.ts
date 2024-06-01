import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.gard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'test-jwt-key', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
