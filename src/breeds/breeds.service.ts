import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  create(createBreedDto: CreateBreedDto) {
    return this.breedRepository.save(createBreedDto);
  }

  findAll() {
    return this.breedRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} breed`;
  }

  update(id: string, updateBreedDto: UpdateBreedDto) {
    return;
  }

  remove(id: string) {
    return this.breedRepository.softDelete({ breedID: id });
  }
}
