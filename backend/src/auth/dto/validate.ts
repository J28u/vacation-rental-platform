import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

export function validateAuthDto(authDto: RegisterDto | LoginDto) {
  if (!authDto.email) {
    throw new HttpException('Email required', HttpStatus.BAD_REQUEST);
  }
  if (!authDto.password) {
    throw new HttpException('Password required', HttpStatus.BAD_REQUEST);
  }
}
