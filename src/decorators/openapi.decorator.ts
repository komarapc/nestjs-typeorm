import { ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS_MESSAGE } from 'src/utils/response-api';
import { applyDecorators } from '@nestjs/common';

export function OpenApiResponses(status: Array<number>) {
  const decorators = status.map((code) =>
    ApiResponse({ status: code, description: HTTP_STATUS_MESSAGE[code] }),
  );
  return applyDecorators(...decorators);
}
