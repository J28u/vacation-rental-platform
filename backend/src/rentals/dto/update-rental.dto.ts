import { CreateRentalDto } from './create-rental.dto';
import { PartialType } from '@nestjs/swagger';
import { AtLeastOneField } from 'src/common/validators/at-least-one-field.validator';

@AtLeastOneField()
export class UpdateRentalDto extends PartialType(CreateRentalDto) {}
