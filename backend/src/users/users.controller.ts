import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserProfileDto } from './dto/user-profile.dto';
import {
  ApiUnauthorized,
  ApiNotFound,
} from '../common/decorators/api-errors.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiOkResponse({ description: 'Success', type: UserProfileDto })
  @ApiUnauthorized()
  @ApiNotFound('User not found')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findProfile(id);
  }
}
