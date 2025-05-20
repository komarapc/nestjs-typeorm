import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Administrative Area - Provinces')
@Controller({ version: ['1'], path: 'administrative-area/provinces' })
export class ProvincesController {
  constructor() {}

  @Get()
  async index(@Query() query: any, @Res() res: Response) {}
}
