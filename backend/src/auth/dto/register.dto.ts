import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  name!: string | null;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
