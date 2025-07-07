import { IsString, MinLength } from 'class-validator';

export class CreateBreedDto {
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  breedName: string;
}
