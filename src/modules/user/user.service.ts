import { Inject, Injectable } from '@nestjs/common';

import { REPOSITORY } from 'src/constant';
import { Repository } from 'typeorm';
import { User } from '../database/entity/user';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORY.USER_REPOSITORY) private userRepo: Repository<User>,
  ) {}
}
