// company.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user'; // Adjust the import path as necessary

@Entity()
export class Company extends BaseEntity {
  constructor(defaults?: ICompany) {
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

  @Column({ type: 'varchar', length: 255, nullable: true })
  logo?: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  headerText?: string;

  @Column({ type: 'json', nullable: true })
  socialLinks?: { [key: string]: string }; // Update this line

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User, (user) => user.company)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;
}

export interface ICompany {
  id?: string;
  logo?: string;
  title: string;
  headerText?: string;
  socialLinks?: { [key: string]: string }; // Update this line
  user_id?: string;
}
