import {
  Controller,
  Post,
  Get,
  Body,
  HttpStatus,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated-request.interface';
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserProfileDto } from 'src/users/dto/user-profile.dto';
import {
  ApiRegisterErrors,
  ApiInvalidCredentials,
  ApiUnauthorized,
  ApiValidationError,
} from 'src/common/decorators/api-errors.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Success', type: AuthResponseDto })
  @ApiRegisterErrors()
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password, dto.name);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success', type: AuthResponseDto })
  @ApiInvalidCredentials()
  @ApiValidationError(['email must be an email'])
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success', type: UserProfileDto })
  @ApiUnauthorized()
  @ApiBearerAuth()
  getProfile(@Req() req: AuthenticatedRequest) {
    return this.authService.getProfile(req.user.sub);
  }
}
