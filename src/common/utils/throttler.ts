import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { HTTP_STATUS_MESSAGE, responseBadRequest } from './response-api';

import { Request } from 'express';
import { ThrottlerOptions } from '@nestjs/throttler';

export const throttler: ThrottlerOptions[] = [
  {
    name: 'short',
    ttl: 10 * 1000, // 10 seconds
    limit: 100, // 100 requests
  },
];

export const trackerThrottler = (
  req: Request,
  context: ExecutionContext,
): string => {
  const ip = req.ip;
  const [bearer, token] = req.headers['authorization']?.split(' ') || [];
  if (!ip)
    throw new HttpException(
      responseBadRequest({
        message: HTTP_STATUS_MESSAGE[HttpStatus.BAD_REQUEST],
      }),
      HttpStatus.BAD_REQUEST,
    );
  if (bearer !== 'Bearer' || !token) return `${ip}`;
  return `${ip}-${token}`;
};
