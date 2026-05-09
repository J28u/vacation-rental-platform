import { Decimal } from '@prisma/client/runtime/client';

export class RentalResponseDto {
  id!: number;
  name!: string;
  surface!: Decimal;
  price!: Decimal;
  picture!: string | null;
  description!: string;
  owner!: OwnerDto;
  created_at!: Date | null;
  updated_at!: Date | null;
}

export class OwnerDto {
  id!: number;
  name!: string;
}
