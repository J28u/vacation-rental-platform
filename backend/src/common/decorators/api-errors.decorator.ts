import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  getSchemaPath,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';

export function ApiInvalidCredentials() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: { $ref: getSchemaPath(ErrorResponseDto) },
          example: {
            message: 'Invalid credentials',
            error: 'Unauthorized',
            statusCode: 401,
          },
        },
      },
    }),
  );
}

export function ApiUnauthorized() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: { $ref: getSchemaPath(ErrorResponseDto) },
          example: {
            message: 'Unauthorized',
            statusCode: 401,
          },
        },
      },
    }),
  );
}

export function ApiRegisterErrors() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: { $ref: getSchemaPath(ErrorResponseDto) },
          examples: {
            emailExists: {
              summary: 'Email exists',
              value: {
                message: 'Email already exists',
                error: 'Bad Request',
                statusCode: 400,
              },
            },
            ValidationError: {
              summary: 'Validation error',
              value: {
                message: [
                  'email must be an email',
                  'password is not strong enough',
                  'password must be a string',
                ],
                error: 'Bad Request',
                statusCode: 400,
              },
            },
          },
        },
      },
    }),
  );
}

export function ApiNotFound(message: string) {
  return applyDecorators(
    ApiNotFoundResponse({
      description: 'Not Found',
      content: {
        'application/json': {
          schema: { $ref: getSchemaPath(ErrorResponseDto) },
          example: {
            message: message,
            error: 'Not Found',
            statusCode: 404,
          },
        },
      },
    }),
  );
}

export function ApiValidationError(messages?: string[]) {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Validation error',
      content: {
        'application/json': {
          schema: { $ref: getSchemaPath(ErrorResponseDto) },
          example: {
            message: messages ?? [
              'name must be longer than or equal to 2 characters',
              'description must be a string',
            ],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      },
    }),
  );
}
