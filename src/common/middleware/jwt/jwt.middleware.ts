import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';

import { HTTP_STATUS_MESSAGE } from '@/common/utils/response-api';
import { Request } from 'express';
import { ServerResponse } from 'http';
import { appConfig } from '@/config';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  private readonly logger = new Logger(JwtMiddleware.name);
  constructor(private readonly jwt: JwtService) {}

  async use(req: Request, res: ServerResponse, next: () => void) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return this.handleError(res, 401, 'Authorization header is missing');
    }
    const [bearer, token] = authorization.split(' ');
    const errMessage = !token
      ? 'Token is missing'
      : 'Authorization header is invalid';
    if (bearer !== 'Bearer' || !token)
      return this.handleError(res, 401, errMessage);
    try {
      const verifiedToken = this.jwt.verify(token, this.jwtOptions());
      if (!verifiedToken) return this.handleError(res, 401, 'Token is invalid');
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        this.tokenExpiredError(error, res);
        return;
      }
      return this.handleError(res, 401, 'Token is invalid');
    }
    next();
  }

  private tokenExpiredError(err: any, res: ServerResponse) {
    const message = err.message;
    this.handleError(res, 401, message);
  }

  private handleError(
    res: ServerResponse,
    statusCode: number,
    message: string,
  ) {
    this.logger.error(message);
    writeResponse({ statusCode, message }, res);
  }

  private jwtOptions(): JwtVerifyOptions {
    return { secret: appConfig().secret.jwt };
  }
}

type ResponseProps = {
  statusCode: number;
  message: string;
};
export function writeResponse(params: ResponseProps, res: ServerResponse) {
  const { message, statusCode } = params;
  const statusMessage = HTTP_STATUS_MESSAGE[params.statusCode];
  res.statusCode = params.statusCode;
  res.writeHead(params.statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ statusCode, statusMessage, message }, null, 2));
}
