import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDTO {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  userName: string;

  @IsEmail()
  @MaxLength(25)
  userEmail: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  userPassword: string;
}
