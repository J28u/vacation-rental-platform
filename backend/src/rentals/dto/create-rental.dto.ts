import { IsString, MinLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
  @ApiProperty({ example: 'Elegant Paris Flat with Eiffel Tower View' })
  @IsString()
  @MinLength(2)
  declare name: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  declare surface: number;

  @ApiProperty({ example: 1200 })
  @IsNumber()
  declare price: number;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
  })
  @IsString()
  declare picture: string;

  @ApiProperty({
    example:
      'Gorgeous flat in the heart of Paris with a stunning view of the Eiffel Tower!',
  })
  @IsString()
  declare description: string;
}
