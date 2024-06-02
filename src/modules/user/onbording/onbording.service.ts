import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OnBoarding, IOnBoarding } from '../../database/entity/onBording';
import { REPOSITORY } from '../../../constant/index';
import { OnboardingDto } from '../dto/onbording.dto';

@Injectable()
export class OnbordingService {
  constructor(
    @Inject(REPOSITORY.ONBORDING_REPOSITORY)
    private companyRepo: Repository<OnBoarding>,
  ) {}

  async addOnBording(data: OnboardingDto, userId: string): Promise<any> {
    try {
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error(err); // Log the error for debugging purposes.
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
