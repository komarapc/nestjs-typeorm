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
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { Response } from 'express';
import {
  ResourcesBulkDto,
  ResourcesDto,
  ResourcesQueryDto,
} from './resources.dto';
import { ResponseApi } from '@/common/utils/response-api';

@Controller({ version: '1', path: 'resources' })
export class ResourcesController {
  constructor(private readonly service: ResourcesService) {}

  @Get()
  async index(@Query() query: ResourcesQueryDto, @Res() res: Response) {
    const r: ResponseApi = await this.service.index(query);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.show(id);
    res.status(r.statusCode).send(r);
  }

  @Post()
  async create(@Body() body: ResourcesDto, @Res() res: Response) {
    const r: ResponseApi = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  async update(
    @Body() body: ResourcesDto,
    @Param('id') id: string,
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
