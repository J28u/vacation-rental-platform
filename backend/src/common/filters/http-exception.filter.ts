import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '../../generated/prisma/client';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private handlePrismaError(
    exception: Prisma.PrismaClientKnownRequestError,
  ): HttpException {
    switch (exception.code) {
      case 'P2002':
        return new ConflictException('A record with this value already exists');
      case 'P2025':
        return new NotFoundException('Record not found');
      default:
        return new HttpException(
          'Database error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      exception = this.handlePrismaError(exception);
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          };

    response
      .status(status)
      .json(
        typeof responseBody === 'object'
          ? responseBody
          : { statusCode: status, message: responseBody },
      );
  }
}
