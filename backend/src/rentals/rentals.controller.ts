import {
  Get,
  Post,
  Put,
  Controller,
  UseGuards,
  HttpStatus,
  HttpCode,
  Body,
  Request,
  Param,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  postOne(@Body() body: CreateRentalDto, @Request() req) {
    return this.rentalsService.create(body, req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.rentalsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param() params) {
    return this.rentalsService.findOne(Number(params.id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  putOne(@Param() params, @Request() req, @Body() body: UpdateRentalDto) {
    return this.rentalsService.update(Number(params.id), req.user.sub, body);
  }
}
