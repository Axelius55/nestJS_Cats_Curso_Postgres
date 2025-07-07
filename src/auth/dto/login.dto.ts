import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDTO {
  @IsEmail()
  @MaxLength(25)
  userEmail: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  userPassword: string;
}
