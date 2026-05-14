export class RentalResponseDto {
  id!: number;
  name!: string;
  surface!: number;
  price!: number;
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

export class RentalsResponseDto {
  rentals!: RentalResponseDto[];
}

class RentalMessageDto {
  message!: string;
  author!: string;
  created_at!: Date | null;
}

export class RentalMessagesResponseDto {
  messages!: RentalMessageDto[];
}
