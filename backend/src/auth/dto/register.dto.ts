import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  declare email: string;

  @IsString()
  @MinLength(8)
  declare password: string;
}
