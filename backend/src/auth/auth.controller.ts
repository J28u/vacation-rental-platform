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
  ApiOperation,
} from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserProfileDto } from '../users/dto/user-profile.dto';
import {
  ApiRegisterErrors,
  ApiInvalidCredentials,
  ApiUnauthorized,
  ApiValidationError,
} from '../common/decorators/api-errors.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new user account and retrieve a JWT token',
  })
  @ApiCreatedResponse({ description: 'Success', type: AuthResponseDto })
  @ApiRegisterErrors()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password, dto.name);
  }

  @ApiOperation({ summary: 'Authenticate and retrieve a JWT token' })
  @ApiOkResponse({ description: 'Success', type: AuthResponseDto })
  @ApiInvalidCredentials()
  @ApiValidationError(['email must be an email'])
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get the authenticated user's profile" })
  @ApiOkResponse({ description: 'Success', type: UserProfileDto })
  @ApiUnauthorized()
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Req() req: AuthenticatedRequest) {
    return this.authService.findProfile(req.user.sub);
  }
}
