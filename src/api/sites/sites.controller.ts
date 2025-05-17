import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Body, Controller, Post, Res } from '@nestjs/common';
import { SitesService } from './sites.service';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';
import { SitesDto } from './sites.dto';
import { Response } from 'express';

@ApiTags('Sites')
@ApiBearerAuth()
@Controller({ version: ['1'], path: 'sites' })
export class SitesController {
  constructor(private readonly service: SitesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new site' })
  @OpenApiResponses([201, 400, 401, 409, 429, 500])
  async store(@Body() body: SitesDto, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }
}
