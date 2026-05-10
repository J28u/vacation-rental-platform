import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { SuccessResponseDto } from '../dto/success-response.dto';

export function ApiCreatedSuccess(message: string) {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'Success',
      content: {
        'application/json': {
          schema: { $ref: getSchemaPath(SuccessResponseDto) },
          example: {
            message: message,
          },
        },
      },
    }),
  );
}

export function ApiSuccess(message: string) {
  return applyDecorators(
    ApiOkResponse({
      description: 'Success',
      content: {
        'application/json': {
          schema: { $ref: getSchemaPath(SuccessResponseDto) },
          example: {
            message: message,
          },
        },
      },
    }),
  );
}
