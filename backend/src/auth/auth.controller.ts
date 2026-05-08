import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { validateAuthDto } from './dto/validate';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body: RegisterDto, @Res() res: Response) {
    validateAuthDto(body);
    return this.authService.register(body.name, body.email, body.password, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    validateAuthDto(body);
    return this.authService.login(body.email, body.password, res);
  }
}
