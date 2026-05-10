import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserProfileDto } from './dto/user-profile.dto';
import {
  ApiUnauthorized,
  ApiNotFound,
} from 'src/common/decorators/api-errors.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Success', type: UserProfileDto })
  @ApiUnauthorized()
  @ApiNotFound('User not found !')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getProfile(id);
  }
}
