import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const breed = await this.breedRepository.findOneBy({
      breedID: id,
    });
    if (!breed) {
      throw new NotFoundException('Breed not found');
    }
    return breed;
  }

  async update(id: string, updateBreedDto: UpdateBreedDto) {
    await this.findOne(id);
    const newbreed = await this.breedRepository.update(id, {
      ...updateBreedDto,
    });
    return newbreed;
  }

  remove(id: string) {
    return this.breedRepository.softDelete({ breedID: id });
  }
}
