import { Injectable } from '@nestjs/common';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserProfileDto } from './dto/user-profile.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { User } from '../generated/prisma/client';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private convertUserToProfile(user: User): UserProfileDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }

  async register(
    email: string,
    password: string,
    name?: string,
  ): Promise<AuthResponseDto> {
    const existing = await this.usersService.findOneByEmail(email);
    if (existing) throw new BadRequestException('Email already exists');

    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      name: name ?? '',
      email: email,
      password: hash,
    });

    const token = await this.jwtService.signAsync({ sub: user.id });
    return { token };
  }

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwtService.signAsync({ sub: user.id });

    return { token };
  }

  async getProfile(id: number): Promise<UserProfileDto> {
    const user = await this.usersService.findOneById(id);
    if (!user) throw new UnauthorizedException();
    return this.convertUserToProfile(user);
  }
}
