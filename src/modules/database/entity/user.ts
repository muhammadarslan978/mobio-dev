// user.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import {
  OnBoardingStatus,
  UserRole,
  UserStatus,
} from '../../../constant/index';

@Entity()
export class User extends BaseEntity {
  constructor(defaults?: IUser) {
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

  @Column({ unique: true })
  @Index({ unique: true })
  displayName: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  @Index({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column()
  addressLineTwo: string;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column()
  country: string;

  @Column({ default: 'Netherlands' })
  activeCountry: string;

  @Column()
  activeCity: string;

  @Column({ unique: true })
  @Index({ unique: true })
  companyName: string;

  @Column()
  domain: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  block: boolean;

  @Column()
  lastLogin: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Available,
  })
  status: UserStatus;

  @Column()
  IBAN: string;

  @Column({
    type: 'enum',
    enum: OnBoardingStatus,
  })
  onBoardingVerified: OnBoardingStatus;

  @Column()
  passwordRestToken: string;

  @Column({ type: 'timestamptz' })
  passwordTokenExpire: Date;

  @Column({ default: true })
  online: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  locationTimeStamp: Date;

  @Column()
  pushToken: string;
}

export interface IUser {
  id?: string;
  displayName: string;
  fullName: string;
  email: string;
  address: string;
  addressLineTwo?: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
  country: string;
  activeCountry?: string;
  activeCity?: string;
  companyName?: string;
  domain: string;
  verified?: boolean;
  block?: boolean;
  lastLogin?: string;
  lat?: string;
  lng?: string;
  location?: string;
  status?: UserStatus;
  IBAN?: string;
  onBoardingVerified?: OnBoardingStatus;
  passwordRestToken?: string;
  passwordTokenExpire?: Date;
  online?: boolean;
  locationTimeStamp?: Date;
  pushToken?: string;
}
