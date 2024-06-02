import { OnBoardingStatus } from '../../../constant/index';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { User } from './user';

@Entity({ name: 'onboarding' })
export class OnBoarding extends BaseEntity {
  constructor(defaults?: IOnBoarding) {
    super();
    if (defaults) {
      Object.assign(this, defaults);
    }
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  numberPlate: string;

  @Column({ type: 'date', nullable: true })
  insuranceExpiry: Date;

  @Column({ type: 'varchar', nullable: true })
  insuranceImage: string;

  @Column({ type: 'date', nullable: true })
  licenseExpiry: Date;

  @Column({ type: 'varchar', nullable: true })
  licenseFront: string;

  @Column({ type: 'varchar', nullable: true })
  licenseBack: string;

  @Column({ type: 'date', nullable: true })
  vehicleCardExpiry: Date;

  @Column({ type: 'varchar', nullable: true })
  vehicleCardFront: string;

  @Column({ type: 'varchar', nullable: true })
  vehicleCardBack: string;

  @Column({ type: 'varchar', nullable: true })
  pictureFront: string;

  @Column({ type: 'varchar', nullable: true })
  pictureBack: string;

  @Column({ type: 'varchar', nullable: true })
  pictureSide: string;

  @Column({
    type: 'enum',
    enum: OnBoardingStatus,
    nullable: true,
  })
  verify: OnBoardingStatus;

  @Column({ type: 'boolean', default: false })
  isCurrent: boolean;

  @ManyToOne(() => User, (user) => user.onBordings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;
}

export interface IOnBoarding {
  id?: string;
  numberPlate?: string;
  insuranceExpiry?: Date;
  insuranceImage?: string;
  licenseExpiry?: Date;
  licenseFront?: string;
  licenseBack?: string;
  vehicleCardExpiry?: Date;
  vehicleCardFront?: string;
  vehicleCardBack?: string;
  pictureFront?: string;
  pictureBack?: string;
  pictureSide?: string;
  verify?: OnBoardingStatus;
  isCurrent?: boolean;
}
