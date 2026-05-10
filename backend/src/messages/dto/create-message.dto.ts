import { IsString, IsInt, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  declare rental_id: number;

  @ApiProperty({
    example:
      "Everything was perfect; it's clear that a lot of thought has gone into making an exceptional experience for guests.",
  })
  @IsString()
  @MinLength(2)
  declare message: string;
}
