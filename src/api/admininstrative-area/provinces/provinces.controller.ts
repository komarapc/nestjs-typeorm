import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller({ version: ['1'], path: 'administrative-areaprovinces' })
export class ProvincesController {
  constructor() {}

  @Get()
  async index(@Query() query: any, @Res() res: Response) {}
}
