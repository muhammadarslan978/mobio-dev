import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {
  private readonly saltRounds = 10;

  async generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  public isValidDomain(domain: string): boolean {
    const re =
      /^((?:(?:(?:\w[.\-+]?)*)\w)+)((?:(?:(?:\w[.\-+]?){0,62})\w)+)\.(\w{2,6})$/;
    return re.test(domain);
  }
}
