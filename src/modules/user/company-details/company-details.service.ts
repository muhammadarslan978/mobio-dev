import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from '../../database/entity/company';
import { REPOSITORY } from '../../../constant/index';

@Injectable()
export class CompanyDetailsService {
  constructor(
    @Inject(REPOSITORY.COMPAY_REPOSITORY)
    private companyRepo: Repository<Company>,
  ) {}

  async saveCompanyDetails(data: any): Promise<void> {
    try {
      // Create company details
      const company = new Company({
        logo: 'default logo',
        title: 'default title',
        headerText: 'default Header text',
        socialLinks: {
          facebook: 'https://facebook.com',
          youtube: 'https://youtube.com',
        },
        user_id: data.user_id,
      });
      await this.companyRepo.save(company);
      console.log('company created!!!!!!!');
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
