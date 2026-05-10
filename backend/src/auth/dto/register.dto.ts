import {
  IsEmail,
  IsString,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Donatello' })
  name?: string;

  @IsEmail()
  @ApiProperty({ example: 'donatello-tmnt@gmail.com' })
  declare email: string;

  @IsString()
  @IsStrongPassword()
  @ApiProperty({ example: "GfyTui0ç6'$42;:1_*" })
  declare password: string;
}
