import { IsString, MinLength, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
  @ApiProperty({ example: 'Elegant Paris Flat with Eiffel Tower View' })
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty({ example: 50 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  surface!: number;

  @ApiProperty({ example: 1200 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  price!: number;

  @ApiProperty({
    example:
      'Gorgeous flat in the heart of Paris with a stunning view of the Eiffel Tower!',
  })
  @IsString()
  description!: string;
}
