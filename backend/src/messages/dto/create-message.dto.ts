import { IsString, IsNumber, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  declare rental_id: number;

  @IsString()
  @MinLength(2)
  declare message: string;
}
