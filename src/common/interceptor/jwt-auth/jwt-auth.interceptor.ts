import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { JwtAuthService } from '@/common/services/jwt-auth/jwt-auth.service';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class JwtAuthInterceptor implements NestInterceptor {
  constructor(private readonly jwtAuth: JwtAuthService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const [_, token] = authorization ? authorization.split(' ') : [];
    this.jwtAuth.setToken(token);
    return next.handle();
  }
}
