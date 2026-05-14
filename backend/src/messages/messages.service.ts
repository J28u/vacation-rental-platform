import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
import { RentalsService } from '../rentals/rentals.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rentalsService: RentalsService,
  ) {}

  async create(
    authorId: number,
    rentalId: number,
    message: string,
  ): Promise<SuccessResponseDto> {
    await this.rentalsService.findOne(rentalId);
    await this.prisma.message.create({
      data: {
        message,
        rentalId,
        authorId,
      },
    });

    return { message: 'Message sent!' };
  }
}
