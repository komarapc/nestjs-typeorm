import { ResponseApi, responseOk } from './common/utils/response-api';

import { Injectable } from '@nestjs/common';

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
