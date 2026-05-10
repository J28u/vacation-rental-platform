import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { RentalsService } from 'src/rentals/rentals.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rentalsService: RentalsService,
  ) {}

  async create(
    userId: number,
    rentalId: number,
    message: string,
  ): Promise<SuccessResponseDto> {
    await this.rentalsService.findOne(rentalId);
    await this.prisma.message.create({
      data: {
        message,
        rentalId,
        userId,
      },
    });

    return { message: 'Message sent' };
  }
}
