import { Breed } from 'src/breeds/entities/breed.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  catID: string;

  @Column()
  catName: string;

  @Column()
  catAge: number;

  @DeleteDateColumn()
  catDelete: Date;

  @ManyToOne(() => Breed, (breed) => breed.catID, {
    eager: true,
  })
  @JoinColumn({ name: 'breedID' })
  breed: Breed;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'email', referencedColumnName: 'userEmail' })
  user: User;

  @Column()
  userEmail: string;
}
