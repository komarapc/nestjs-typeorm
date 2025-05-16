import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  private readonly logger = new Logger(JwtMiddleware.name);
  async use(req: any, res: any, next: () => void) {
    this.logger.log(JwtMiddleware.name);
    next();
  }
}
