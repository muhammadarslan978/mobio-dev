import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class OnboardingDto {
  @ApiProperty({
    description: 'The insurance expiry date of the user',
    example: '2024-06-30',
  })
  @IsString()
  @IsNotEmpty()
  insuranceExpiry: string;

  @ApiProperty({
    description: 'The URL of the insurance image',
    example: 'https://example.com/insurance-image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  insuranceImage: string;

  @ApiProperty({
    description: 'The license expiry date of the user',
    example: '2024-07-15',
  })
  @IsString()
  @IsNotEmpty()
  licenseExpiry: string;

  @ApiProperty({
    description: 'The URL of the front side of the license image',
    example: 'https://example.com/license-front.jpg',
  })
  @IsString()
  @IsNotEmpty()
  licenseFront: string;

  @ApiProperty({
    description: 'The URL of the back side of the license image',
    example: 'https://example.com/license-back.jpg',
  })
  @IsString()
  @IsNotEmpty()
  licenseBack: string;

  @ApiProperty({
    description: 'The vehicle card expiry date of the user',
    example: '2024-07-20',
  })
  @IsString()
  @IsNotEmpty()
  vehicleCardExpiry: string;

  @ApiProperty({
    description: 'The URL of the front side of the vehicle card image',
    example: 'https://example.com/vehicle-card-front.jpg',
  })
  @IsString()
  @IsNotEmpty()
  vehicleCardFront: string;

  @ApiProperty({
    description: 'The URL of the back side of the vehicle card image',
    example: 'https://example.com/vehicle-card-back.jpg',
  })
  @IsString()
  @IsNotEmpty()
  vehicleCardBack: string;

  @ApiProperty({
    description: 'The URL of the front side of the user picture',
    example: 'https://example.com/picture-front.jpg',
  })
  @IsString()
  @IsNotEmpty()
  pictureFront: string;

  @ApiProperty({
    description: 'The URL of the back side of the user picture',
    example: 'https://example.com/picture-back.jpg',
  })
  @IsString()
  @IsNotEmpty()
  pictureBack: string;

  @ApiProperty({
    description: 'The URL of the side view of the user picture',
    example: 'https://example.com/picture-side.jpg',
  })
  @IsString()
  @IsNotEmpty()
  pictureSide: string;

  @ApiProperty({
    description: 'The number plate of the vehicle',
    example: 'AB1234CD',
  })
  @IsString()
  @IsNotEmpty()
  numberPlate: string;

  @ApiProperty({
    description: 'The ID of the car',
    example: 'abc123',
  })
  @IsString()
  @IsNotEmpty()
  carId: string;

  @ApiProperty({
    description: 'The ID of the car brand',
    example: 'xyz456',
  })
  @IsString()
  @IsNotEmpty()
  brandId: string;

  @ApiProperty({
    description: 'The verification status of the onboarding process',
    enum: ['Approved', 'Rejected', 'Pending'],
    default: 'Pending',
  })
  @IsString()
  @IsNotEmpty()
  verify: 'Approved' | 'Rejected' | 'Pending';

  @ApiProperty({
    description: 'Flag indicating if this is the current onboarding process',
    example: true,
  })
  @IsOptional()
  isCurrent?: boolean;
}
