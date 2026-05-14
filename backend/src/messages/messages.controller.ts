import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  ApiNotFound,
  ApiUnauthorized,
  ApiValidationError,
} from '../common/decorators/api-errors.decorator';
import { ApiCreatedSuccess } from '../common/decorators/api-success.decorator';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated-request.interface';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send a message' })
  @ApiCreatedSuccess('Message sent!')
  @ApiValidationError(['message must be a string'])
  @ApiUnauthorized()
  @ApiNotFound('Rental not found')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CreateMessageDto, @Request() req: AuthenticatedRequest) {
    return this.messagesService.create(
      req.user.sub,
      body.rental_id,
      body.message,
    );
  }
}
