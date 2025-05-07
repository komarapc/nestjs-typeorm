import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseApi, responseOk } from './utils/response-api';

type Data = {
  app_name: string;
  api_version: Record<string, string>;
};

@Injectable()
export class AppService {
  async getApp(): Promise<ResponseApi> {
    const data: Data = {
      app_name: process.env.APP_NAME || 'API',
      api_version: {
        '1': 'Initial release',
      },
    };
    return responseOk({ data });
  }
}
