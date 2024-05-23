// user.entity.ts

import { USERROLE } from '../../../constant'
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity()
export class User extends BaseEntity {
    constructor(defaults?: IUser) {
        super()
        if (defaults) {
            Object.assign(this, defaults)
        }
        if (!this.id) {
            this.id = uuidv4()
        }
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    firstName?: string

    @Column({ nullable: true })
    lastName?: string

    @Column({ default: true })
    isActive: boolean

    @Column({ default: true })
    isVerified: boolean

    @Column({ enum: USERROLE, default: USERROLE.USER })
    role: USERROLE
}

export interface IUser {
    id?: string
    username: string
    email: string
    password: string
    firstName?: string
    lastName?: string
    isActive?: boolean
    isVerified: boolean
    role: USERROLE
}
