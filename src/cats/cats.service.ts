import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}
  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {
    const breed = createCatDto.breed
      ? await this.validateBreed(createCatDto.breed)
      : undefined;

    return await this.catRepository.save({
      ...createCatDto,
      breed: breed,
      userEmail: user.email,
    });
  }

  async findAll(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return this.catRepository.find();
    }
    return this.catRepository.find({
      where: { userEmail: user.email },
    });
  }

  async findOne(id: string, user: UserActiveInterface) {
    const cat = await this.catRepository.findOneBy({
      catID: id,
    });
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    this.validateOwnership(cat, user);
    return cat;
  }

  async update(
    id: string,
    updateCatDto: UpdateCatDto,
    user: UserActiveInterface,
  ) {
    await this.findOne(id, user);
    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed
        ? await this.validateBreed(updateCatDto.breed)
        : undefined,
      userEmail: user.email,
    });
  }

  async remove(id: string, user: UserActiveInterface) {
    await this.findOne(id, user);
    return await this.catRepository.softDelete({ catID: id });
  }

  private validateOwnership(cat: Cat, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
      throw new UnauthorizedException('No te pertenece este gato');
    }
  }

  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({
      breedID: breed,
    });
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
    return breedEntity;
  }
}

//token admin eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF4ZWxpdG8xQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MTY4NTQ5OSwiZXhwIjoxNzUxNzcxODk5fQ.jE3FqzdUIi4y-_iAAtish1tws1epTTrpwPOFzSL29V8

//token user axelito eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF4ZWxpdG9AZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTE2ODU2NzUsImV4cCI6MTc1MTc3MjA3NX0.GXKBFhKSZNVU6VPBIMqUrAbm2OcYa-OyDOXHULZIxDQ

//token axelito2 user eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF4ZWxpdG8yQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzUxNjg1Nzc2LCJleHAiOjE3NTE3NzIxNzZ9.2AQd3MPGGbn0aFVnQ4rUS049tPBqCVOSC_ky17G4_Eg
