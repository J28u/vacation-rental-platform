import { IsString, MinLength, IsNumber } from 'class-validator';

export class CreateRentalDto {
  @IsString()
  @MinLength(2)
  declare name: string;

  @IsNumber()
  declare surface: number;

  @IsNumber()
  declare price: number;

  @IsString()
  declare picture: string;

  @IsString()
  declare description: string;
}
