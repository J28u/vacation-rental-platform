import {
  Get,
  Post,
  Put,
  Controller,
  UseGuards,
  Body,
  Request,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiConsumes,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { RentalsService } from './rentals.service';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated-request.interface';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { CreateRentalForm } from './dto/create-rental-form.dto';
import { UpdateRentalForm } from './dto/update-rental-form.dto';
import {
  RentalsResponseDto,
  RentalResponseDto,
  RentalMessagesResponseDto,
} from './dto/rental-response.dto';
import {
  ApiCreatedSuccess,
  ApiSuccess,
} from '../common/decorators/api-success.decorator';
import {
  ApiValidationError,
  ApiUnauthorized,
  ApiNotFound,
} from '../common/decorators/api-errors.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { rentalStorage } from './rentals.multer';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  private buildPictureUrl(file: Express.Multer.File): string {
    return `/uploads/${file.filename}`;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new rental' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateRentalForm })
  @ApiCreatedSuccess('Rental created!')
  @ApiValidationError()
  @ApiUnauthorized()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('picture', { storage: rentalStorage }))
  @Post()
  create(
    @Body() dto: CreateRentalDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthenticatedRequest,
  ) {
    if (!file) throw new BadRequestException('Picture is required');
    const pictureUrl = this.buildPictureUrl(file);
    return this.rentalsService.create(dto, pictureUrl, req.user.sub);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all rentals' })
  @ApiOkResponse({ description: 'Success', type: RentalsResponseDto })
  @ApiUnauthorized()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.rentalsService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get rental details by ID' })
  @ApiOkResponse({ description: 'Success', type: RentalResponseDto })
  @ApiUnauthorized()
  @ApiNotFound('Rental not found')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get messages for a rental' })
  @ApiOkResponse({ description: 'Success', type: RentalMessagesResponseDto })
  @ApiUnauthorized()
  @ApiNotFound('Rental not found')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id/messages')
  findMessages(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.findMessages(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a rental' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateRentalForm })
  @ApiSuccess('Rental updated!')
  @ApiValidationError(['At least one field must be provided'])
  @ApiUnauthorized()
  @ApiNotFound('Rental not found')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('picture', { storage: rentalStorage }))
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRentalDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthenticatedRequest,
  ) {
    const pictureUrl = file ? this.buildPictureUrl(file) : null;
    return this.rentalsService.update(id, req.user.sub, dto, pictureUrl);
  }
}
