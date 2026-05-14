import { PartialType } from '@nestjs/swagger';
import { CreateRentalForm } from './create-rental-form.dto';

export class UpdateRentalForm extends PartialType(CreateRentalForm) {}
