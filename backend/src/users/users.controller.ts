import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param() params) {
    return this.usersService.getProfile(Number(params.id));
  }
}
