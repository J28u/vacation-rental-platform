import {
  Injectable,
  Body,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import {
  RentalResponseDto,
  RentalsResponseDto,
  RentalMessagesResponseDto,
} from './dto/rental-response.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
import type { MessageWithAuthor } from '../messages/types/message-with-author.type';
import type { RentalWithOwner } from './types/rental-with-owner.type';
import type { RentalWithMessages } from './types/rental-with-messages.type';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  private convertToRentalResponseDto(
    rental: RentalWithOwner,
  ): RentalResponseDto {
    return {
      id: rental.id,
      name: rental.name,
      surface: Number(rental.surface),
      price: Number(rental.price),
      picture: rental.picture,
      description: rental.description,
      owner: {
        id: rental.ownerId,
        name: rental.owner.name,
      },
      created_at: rental.createdAt,
      updated_at: rental.updatedAt,
    };
  }

  private convertToRentalMessagesResponseDto(
    rental: RentalWithMessages,
  ): RentalMessagesResponseDto {
    return {
      messages: rental.messages.map((m: MessageWithAuthor) => {
        return {
          message: m.message,
          author: m.author.name,
          created_at: m.createdAt,
        };
      }),
    };
  }

  async findOne(id: number): Promise<RentalResponseDto> {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
      include: {
        owner: true,
      },
    });

    if (!rental) throw new NotFoundException('Rental not found');
    return this.convertToRentalResponseDto(rental);
  }

  async findAll(): Promise<RentalsResponseDto> {
    const rentals = await this.prisma.rental.findMany({
      include: {
        owner: true,
      },
    });

    return {
      rentals: rentals.map((rental) => this.convertToRentalResponseDto(rental)),
    };
  }

  async findMessages(id: number): Promise<RentalMessagesResponseDto> {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
      include: {
        messages: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!rental) throw new NotFoundException('Rental not found!');
    return this.convertToRentalMessagesResponseDto(rental);
  }

  async create(
    @Body() dto: CreateRentalDto,
    pictureUrl: string,
    ownerId: number,
  ): Promise<SuccessResponseDto> {
    await this.prisma.rental.create({
      data: {
        ...dto,
        picture: pictureUrl,
        owner: { connect: { id: ownerId } },
      },
    });

    return { message: 'Rental created!' };
  }

  async update(
    id: number,
    ownerId: number,
    body: UpdateRentalDto,
    pictureUrl: string | null,
  ): Promise<{ message: string }> {
    const hasBodyFields = Object.keys(body).length > 0;
    const hasPicture = !!pictureUrl;

    if (!hasBodyFields && !hasPicture) {
      throw new BadRequestException('At least one field must be provided');
    }

    const rental = await this.findOne(id);
    if (rental.owner.id !== ownerId)
      throw new UnauthorizedException('Unauthorized');

    let payload = hasPicture ? { ...body, picture: pictureUrl } : { ...body };
    await this.prisma.rental.update({
      where: { id },
      data: payload,
    });

    return { message: 'Rental updated!' };
  }
}
