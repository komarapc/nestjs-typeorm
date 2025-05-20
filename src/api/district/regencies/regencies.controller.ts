import { Controller, Get, Query, Res } from '@nestjs/common';
import { RegenciesService } from './regencies.service';
import { Response } from 'express';

@Controller({ version: ['1'], path: 'district/regencies' })
export class RegenciesController {
  constructor(private readonly service: RegenciesService) {}

  @Get()
  async index(@Query() query: any, @Res() res: Response) {}
}
