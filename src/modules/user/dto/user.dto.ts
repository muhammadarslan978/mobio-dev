import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsAlphanumeric,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WebSignUpDto {
  @ApiProperty({
    description: 'The display name of the user',
    minimum: 3,
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  displayName: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    minimum: 8,
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'The company name of the user',
    example: 'Example Corp',
  })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({
    description: 'The country of the user',
    example: 'Netherlands',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'The city of the user',
    example: 'Amsterdam',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'The address of the user',
    example: '123 Main Street',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The second line of the address, if any',
    example: 'Apt 456',
    required: false,
  })
  @IsString()
  @IsOptional()
  addressLineTwo?: string | null;

  @ApiProperty({
    description: 'The postal code of the user',
    example: '12345',
  })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({
    description: 'The active city of the user',
    example: 'Rotterdam',
  })
  @IsString()
  @IsNotEmpty()
  activeCity: string;

  @ApiProperty({
    description: 'The active country of the user',
    example: 'Netherlands',
    required: false,
  })
  @IsString()
  @IsOptional()
  activeCountry?: string;

  @ApiProperty({
    description: 'The IBAN of the user',
    example: 'NL91ABNA0417164300',
  })
  @IsString()
  @IsNotEmpty()
  IBAN: string;

  @ApiProperty({
    description: 'The domain of the user',
    example: 'example.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  domain?: string;
}

export class MobileSignupDto {
  @ApiProperty({
    description: 'The display name of the user',
    minimum: 3,
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  displayName: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The address of the user',
    example: '123 Main Street',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The second line of the address, if any',
    example: 'Apt 456',
    required: false,
  })
  @IsString()
  @IsOptional()
  addressLineTwo?: string | null;

  @ApiProperty({
    description: 'The postal code of the user',
    example: '12345',
  })
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  postalCode: string;

  @ApiProperty({
    description: 'The city of the user',
    example: 'Amsterdam',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+123456789',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'The password of the user',
    minimum: 8,
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'The active city of the user',
    example: 'Rotterdam',
  })
  @IsString()
  @IsNotEmpty()
  activeCity: string;

  @ApiProperty({
    description: 'The active country of the user',
    example: 'Netherlands',
    required: false,
  })
  @IsString()
  @IsOptional()
  activeCountry?: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'The display name of the user',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The last login time of the user',
    example: '2024-05-23T08:30:00Z',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastLogin?: string;
}
