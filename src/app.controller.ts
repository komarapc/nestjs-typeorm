import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getApp(@Res() res: Response) {
    const r = await this.appService.getApp();
    res.status(r.statusCode).send(r);
  }
}
