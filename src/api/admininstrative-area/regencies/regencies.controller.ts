import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { RegenciesService } from './regencies.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Administrative Area - Regency')
@ApiBearerAuth()
@Controller({ version: ['1'], path: 'administrative-arearegencies' })
export class RegenciesController {
  constructor(private readonly service: RegenciesService) {}

  @Get()
  async index(@Query() query: any, @Res() res: Response) {}

  @Get(':id')
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.findById(id);
    res.status(r.statusCode).send(r);
  }
}
