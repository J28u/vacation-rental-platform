import { ApiProperty } from '@nestjs/swagger';
import { CreateRentalDto } from './create-rental.dto';

export class CreateRentalForm extends CreateRentalDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  picture!: Express.Multer.File;
}
