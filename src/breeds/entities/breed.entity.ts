import { Cat } from 'src/cats/entities/cat.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn('uuid')
  breedID: string;

  @Column()
  breedName: string;

  @OneToMany(() => Cat, (cat) => cat.breed)
  catID: Cat[];

  @DeleteDateColumn()
  deleteBreed: Date;
}
