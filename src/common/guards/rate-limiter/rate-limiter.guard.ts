import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ThrottlerGuard, ThrottlerLimitDetail } from '@nestjs/throttler';

import { HTTP_STATUS_MESSAGE } from '@/common/utils/response-api';

@Injectable()
export class RateLimiterGuard extends ThrottlerGuard {
  protected throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail,
  ): Promise<void> {
    throw new HttpException(
      {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        statusMessage: HTTP_STATUS_MESSAGE[HttpStatus.TOO_MANY_REQUESTS],
        message: 'Too many requests, Please try again later.',
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
