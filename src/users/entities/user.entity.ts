import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column()
  userName: string;

  @Column({ unique: true, nullable: false })
  userEmail: string;

  @Column({ unique: true, nullable: false, select: false })
  userPassword: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  userRole: string;

  @DeleteDateColumn()
  userDelete: Date;
}
