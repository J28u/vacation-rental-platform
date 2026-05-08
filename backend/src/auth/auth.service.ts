import { Injectable } from '@nestjs/common';
import {
  Res,
  Request,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import type { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { convertUsertoProfile } from './dto/userProfile.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    name: string | null,
    email: string,
    password: string,
    @Res() res: Response,
  ) {
    try {
      let user = await this.usersService.findOne({ email: email });
      if (user) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }

      const hash = await bcrypt.hash(password, 10);
      user = await this.usersService.createUser({
        name: name ? name : '',
        email: email,
        password: hash,
      });

      if (user) {
        const token = await this.jwtService.signAsync({ sub: user.id });
        res.status(200).json({ token: token });
        return { token: token };
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      console.log(error);
      error instanceof HttpException
        ? res.status(error.getStatus()).json(error.getResponse())
        : res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal server error' });
    }
  }

  async login(email: string, password: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne({ email: email });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const token = await this.jwtService.signAsync({ sub: user.id });

      res.status(201).json({ token: token });
      return { token: token };
    } catch (error) {
      console.log(error);
      error instanceof HttpException
        ? res.status(error.getStatus()).json(error.getResponse())
        : res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal server error' });
    }
  }

  async getProfile(@Request() req, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne({ id: req.user.sub });
      if (!user) {
        throw new UnauthorizedException();
      }
      const userProfile = convertUsertoProfile(user);
      res.status(HttpStatus.OK).json(userProfile);
      return userProfile;
    } catch (error) {
      console.log(error);
      error instanceof HttpException
        ? res.status(error.getStatus()).json(error.getResponse())
        : res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal Server Error' });
    }
  }
}
