import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    example: 'Email already exists',
  })
  declare message: string | string[];

  @ApiProperty({ example: 'Bad Request' })
  declare error: string;

  @ApiProperty({ example: 400 })
  declare statusCode: number;
}
