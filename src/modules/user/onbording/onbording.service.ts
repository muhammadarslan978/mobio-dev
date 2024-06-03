import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OnBoarding, IOnBoarding } from '../../database/entity/onBording';
import { OnBoardingStatus, REPOSITORY } from '../../../constant/index';
import { OnboardingDto } from '../dto/onbording.dto';

@Injectable()
export class OnbordingService {
  constructor(
    @Inject(REPOSITORY.ONBORDING_REPOSITORY)
    private onbordingRepo: Repository<OnBoarding>,
  ) {}

  async addOnBording(
    data: OnboardingDto,
    userId: string,
  ): Promise<IOnBoarding> {
    try {
      const existingOnBording = await this.onbordingRepo.findOne({
        where: { userId },
      });

      if (existingOnBording) {
        data.licenseCard = {
          expiry: existingOnBording.licenseExpiry,
          frontImage: existingOnBording.licenseFront,
          backImage: existingOnBording.licenseBack,
        };
        const onboarding = new OnBoarding();
        Object.assign(onboarding, data);
        onboarding.verify = OnBoardingStatus.Pending;
        return await this.onbordingRepo.save(onboarding);
      }

      const onboarding = new OnBoarding();
      Object.assign(onboarding, data);
      onboarding.userId = userId;
      onboarding.verify = OnBoardingStatus.Pending;
      return await this.onbordingRepo.save(onboarding);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error(err); // Log the error for debugging purposes.
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
