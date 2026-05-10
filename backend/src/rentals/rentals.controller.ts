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
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { RentalsService } from './rentals.service';
import type { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request.interface';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import {
  RentalsResponseDto,
  RentalResponseDto,
} from './dto/rental-response.dto';
import {
  ApiCreatedSuccess,
  ApiSuccess,
} from 'src/common/decorators/api-success.decorator';
import {
  ApiValidationError,
  ApiUnauthorized,
  ApiNotFound,
} from 'src/common/decorators/api-errors.decorator';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiCreatedSuccess('Rental created')
  @ApiValidationError()
  @ApiUnauthorized()
  postOne(@Body() dto: CreateRentalDto, @Request() req: AuthenticatedRequest) {
    return this.rentalsService.create(dto, req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Success', type: RentalsResponseDto })
  @ApiUnauthorized()
  getAll() {
    return this.rentalsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Success', type: RentalResponseDto })
  @ApiNotFound('Rental not found')
  @ApiUnauthorized()
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiSuccess('Rental updated')
  @ApiNotFound('Rental not found')
  @ApiValidationError(['At least one field must be provided'])
  @ApiUnauthorized()
  putOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
    @Body() dto: UpdateRentalDto,
  ) {
    return this.rentalsService.update(id, req.user.sub, dto);
  }
}
