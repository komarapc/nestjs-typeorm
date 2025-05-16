import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  async use(req: any, res: any, next: () => void) {
    const { method, originalUrl } = req;
    const startTime = Date.now();
    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      const message = `${method} ${originalUrl} ${statusCode} ${duration}ms`;
      if (statusCode >= 400 && statusCode < 600) {
        this.logger.error(message);
      } else {
        this.logger.log(message);
      }
    });
    next();
  }
}
