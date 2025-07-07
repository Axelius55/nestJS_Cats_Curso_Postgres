import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Breed } from '../../breeds/entities/breed.entity';

export class CreateCatDto {
  @IsString()
  @MaxLength(20)
  @MinLength(1)
  catName: string;

  @IsNumber()
  @IsPositive()
  catAge: number;

  @IsUUID()
  @IsString()
  @IsOptional()
  breed?: string;
}
