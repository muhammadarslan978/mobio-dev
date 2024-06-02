// user.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {
  OnBoardingStatus,
  UserRole,
  UserStatus,
} from '../../../constant/index';
import { Company } from './company'; // Adjust the import path as necessary
import { OnBoarding } from './onBording';

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

  @Column({ nullable: true })
  fullName: string;

  @Column({ unique: true })
  @Index({ unique: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  addressLineTwo: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ nullable: true })
  country: string;

  @Column({ default: 'Netherlands' })
  activeCountry: string;

  @Column({ nullable: true })
  activeCity: string;

  @Column({ unique: true, nullable: true })
  @Index({ unique: true })
  companyName: string;

  @Column({ nullable: true })
  domain: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  block: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

  @Column({ nullable: true })
  lat: string;

  @Column({ nullable: true })
  lng: string;

  @Column({ nullable: true })
  location: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Available,
  })
  status: UserStatus;

  @Column({ nullable: true })
  IBAN: string;

  @Column({
    type: 'enum',
    enum: OnBoardingStatus,
    nullable: true,
  })
  onBoardingVerified: OnBoardingStatus;

  @Column({ nullable: true })
  passwordRestToken: string;

  @Column({ type: 'timestamptz', nullable: true })
  passwordTokenExpire: Date;

  @Column({ default: true })
  online: boolean;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  locationTimeStamp: Date;

  @Column({ nullable: true })
  pushToken: string;

  @OneToOne(() => Company, (company) => company.user, { cascade: true })
  company: Company;

  @OneToOne(() => OnBoarding, (x) => x.user, { cascade: true })
  onBordings: OnBoarding;
}

export interface IUser {
  id?: string;
  displayName?: string;
  fullName?: string;
  email?: string;
  address?: string;
  addressLineTwo?: string;
  postalCode?: string;
  city?: string;
  phoneNumber?: string;
  password?: string;
  role?: UserRole;
  country?: string;
  activeCountry?: string;
  activeCity?: string;
  companyName?: string;
  domain?: string;
  verified?: boolean;
  block?: boolean;
  lastLogin: Date;
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
  company?: Company; // Add company to the IUser interface
}
