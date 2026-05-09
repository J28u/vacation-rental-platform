import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    rentalId: number,
    message: string,
  ): Promise<{ message: string }> {
    const m = await this.prisma.message.create({
      data: {
        message,
        rentalId,
        userId,
      },
    });

    if (!m) throw new BadRequestException('Validation error');
    return { message: 'Message sent!' };
  }
}
