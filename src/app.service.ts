import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseApi, responseOk } from './utils/response-api';

type Data = {
  version: string;
  app_name: string;
};

@Injectable()
export class AppService {
  async getApp(): Promise<ResponseApi> {
    const data: Data = {
      app_name: process.env.APP_NAME || 'API',
      version: process.env.APP_VERSION || '1.0.0',
    };
    return responseOk({ data });
  }
}
