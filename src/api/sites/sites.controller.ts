import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SitesService } from './sites.service';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';
import { SitesDto, SitesQueryDto } from './sites.dto';
import { Response } from 'express';
import { RoleGuard } from '@/common/guards/role/role.guard';

@ApiTags('Sites')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@Controller({ version: ['1'], path: 'sites' })
export class SitesController {
  constructor(private readonly service: SitesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sites' })
  @OpenApiResponses([200, 400, 401, 404, 429, 500])
  async index(@Query() query: SitesQueryDto, @Res() res: Response) {
    const r = await this.service.index(query);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.findOne(id);
    res.status(r.statusCode).send(r);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new site' })
  @OpenApiResponses([201, 400, 401, 409, 429, 500])
  async store(@Body() body: SitesDto, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a site' })
  @OpenApiResponses([200, 400, 401, 404, 409, 429, 500])
  async update(
    @Param('id') id: string,
    @Body() body: SitesDto,
    @Res() res: Response,
  ) {
    const r = await this.service.update(id, body);
    res.status(r.statusCode).send(r);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.destroy(id);
    res.status(r.statusCode).send(r);
  }
}
