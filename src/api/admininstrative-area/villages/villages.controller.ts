import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { VillagesService } from './villages.service';
import { Response } from 'express';

@ApiTags('Administrative Area - Villages')
@ApiBearerAuth()
@Controller({ version: ['1'], path: 'administrative-area/villages' })
export class VillagesController {
  constructor(private readonly service: VillagesService) {}

  @Get(':id')
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.findById(id);
    res.status(r.statusCode).send(r);
  }
}
