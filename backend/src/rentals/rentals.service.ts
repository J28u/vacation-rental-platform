import {
  Injectable,
  Body,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { RentalResponseDto } from './dto/rental-response.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  private convertToRentalResponseDto(rental): RentalResponseDto {
    return {
      id: rental.id,
      name: rental.name,
      surface: rental.surface,
      price: rental.price,
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

  async findAll(): Promise<{ rentals: RentalResponseDto[] }> {
    const rentals = await this.prisma.rental.findMany({
      include: {
        owner: true,
      },
    });

    return {
      rentals: rentals.map((rental) => this.convertToRentalResponseDto(rental)),
    };
  }

  async create(
    @Body() body: CreateRentalDto,
    ownerId: number,
  ): Promise<{ message: string }> {
    const rental = await this.prisma.rental.create({
      data: {
        ...body,
        owner: { connect: { id: ownerId } },
      },
    });
    if (!rental) throw new BadRequestException('Validation error');

    return { message: 'Rental created!' };
  }

  async update(
    id: number,
    ownerId: number,
    body: UpdateRentalDto,
  ): Promise<{ message: string }> {
    const rental = await this.findOne(id);
    if (rental.owner.id !== ownerId)
      throw new UnauthorizedException('Unauthorized');
    console.log(body);
    const update = await this.prisma.rental.update({
      where: { id },
      data: {
        ...body,
      },
    });

    if (!update) throw new BadRequestException('Validation error');

    return { message: 'Rental updated !' };
  }
}
