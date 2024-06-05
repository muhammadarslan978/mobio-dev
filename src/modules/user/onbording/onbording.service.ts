import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { OnBoarding, IOnBoarding } from '../../database/entity/onBording';
import { OnBoardingStatus, REPOSITORY } from '../../../constant/index';
import { OnboardingDto, UpdateOnboardingDto } from '../dto/onbording.dto';

@Injectable()
export class OnbordingService {
  constructor(
    @Inject(REPOSITORY.ONBORDING_REPOSITORY)
    private onbordingRepo: Repository<OnBoarding>,
  ) {}

  async addOnBoarding(
    data: OnboardingDto,
    userId: string,
  ): Promise<IOnBoarding> {
    try {
      const existingOnBoarding = await this.onbordingRepo.findOne({
        where: { userId },
      });

      if (existingOnBoarding) {
        data.licenseCard = {
          expiry: existingOnBoarding.licenseExpiry,
          frontImage: existingOnBoarding.licenseFront,
          backImage: existingOnBoarding.licenseBack,
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

  async getOnboarding(userId: string): Promise<IOnBoarding> {
    try {
      return await this.onbordingRepo.findOne({ where: { userId } });
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error(err); // Log the error for debugging purposes.
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOnboarding(
    data: UpdateOnboardingDto,
    userId: string,
  ): Promise<IOnBoarding> {
    try {
      const onboarding = await this.onbordingRepo.findOne({
        where: { id: userId },
      });
      if (!onboarding) {
        throw new NotFoundException('Onboarding record not found');
      }

      if (onboarding.verify === OnBoardingStatus.Approved) {
        throw new ConflictException('You cannot edit an approved onboarding');
      }
      if (onboarding.verify === OnBoardingStatus.Rejected) {
        onboarding.verify = OnBoardingStatus.Pending;
      }
      Object.assign(onboarding, data);
      const savedOnboarding = await this.onbordingRepo.save(onboarding);
      return savedOnboarding;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error(err); // Log the error for debugging purposes.
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
