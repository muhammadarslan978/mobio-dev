import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class InsuranceDocumentDto {
  @ApiProperty({
    description: 'Expiry date of the insurance document',
    example: '2023-12-31',
  })
  @IsString()
  @IsNotEmpty()
  expiry: string;

  @ApiProperty({
    description: 'Image URL of the insurance document',
    example: 'http://example.com/image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}

class LicenseCardDto {
  @ApiProperty({
    description: 'Expiry date of the license card',
    example: '2023-12-31',
  })
  @IsString()
  @IsNotEmpty()
  expiry: string;

  @ApiProperty({
    description: 'Front image URL of the license card',
    example: 'http://example.com/front.jpg',
  })
  @IsString()
  @IsNotEmpty()
  frontImage: string;

  @ApiProperty({
    description: 'Back image URL of the license card',
    example: 'http://example.com/back.jpg',
  })
  @IsString()
  @IsNotEmpty()
  backImage: string;
}

class VehicleCardDto {
  @ApiProperty({
    description: 'Expiry date of the vehicle card',
    example: '2023-12-31',
  })
  @IsString()
  @IsNotEmpty()
  expiry: string;

  @ApiProperty({
    description: 'Front image URL of the vehicle card',
    example: 'http://example.com/front.jpg',
  })
  @IsString()
  @IsNotEmpty()
  frontImage: string;

  @ApiProperty({
    description: 'Back image URL of the vehicle card',
    example: 'http://example.com/back.jpg',
  })
  @IsString()
  @IsNotEmpty()
  backImage: string;
}

class PicturesDto {
  @ApiProperty({
    description: 'Front image URL of the car',
    example: 'http://example.com/front.jpg',
  })
  @IsString()
  @IsNotEmpty()
  frontImage: string;

  @ApiProperty({
    description: 'Back image URL of the car',
    example: 'http://example.com/back.jpg',
  })
  @IsString()
  @IsNotEmpty()
  backImage: string;

  @ApiProperty({
    description: 'Side image URL of the car',
    example: 'http://example.com/side.jpg',
  })
  @IsString()
  @IsNotEmpty()
  sideImage: string;
}

export class OnboardingDto {
  @ApiProperty({
    description: 'ID of the car',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  carId: string;

  @ApiProperty({
    description: 'ID of the brand',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsUUID()
  @IsNotEmpty()
  brandId: string;

  @ApiProperty({ description: 'Number plate of the car', example: 'AB-123-CD' })
  @IsString()
  @IsNotEmpty()
  numberPlate: string;

  @ApiProperty({ description: 'Insurance document details' })
  @ValidateNested()
  @Type(() => InsuranceDocumentDto)
  insuranceDocument: InsuranceDocumentDto;

  @ApiProperty({ description: 'License card details', required: false })
  @ValidateNested()
  @Type(() => LicenseCardDto)
  licenseCard?: LicenseCardDto;

  @ApiProperty({ description: 'Vehicle card details' })
  @ValidateNested()
  @Type(() => VehicleCardDto)
  vehicleCard: VehicleCardDto;

  @ApiProperty({ description: 'Pictures of the car' })
  @ValidateNested()
  @Type(() => PicturesDto)
  pictures: PicturesDto;
}
