import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
  Request,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  ApiNotFound,
  ApiUnauthorized,
  ApiValidationError,
} from 'src/common/decorators/api-errors.decorator';
import { ApiCreatedSuccess } from 'src/common/decorators/api-success.decorator';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiCreatedSuccess('Message sent')
  @ApiValidationError(['message must be a string'])
  @ApiUnauthorized()
  @ApiNotFound('Rental not found')
  postMessage(@Body() body: CreateMessageDto, @Request() req) {
    return this.messagesService.create(
      req.user.sub,
      body.rental_id,
      body.message,
    );
  }
}
