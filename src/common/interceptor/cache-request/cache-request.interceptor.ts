import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { createHash } from 'crypto';

@Injectable()
export class CacheRequestInterceptor implements NestInterceptor {
  constructor(private readonly cahceReq: CacheRequestService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const originalUrl = request.originalUrl;
    const [_, token] = request.headers.authorization?.split(' ') || [];
    const cacheKey = `${originalUrl}-${token}`;
    const hashKey = createHash('sha256').update(cacheKey).digest('hex');
    this.cahceReq.setCacheKey(hashKey);
    return next.handle();
  }
}
