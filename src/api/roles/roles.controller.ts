import { ApiTags } from '@nestjs/swagger';
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
import { RolesService } from './roles.service';
import { Response } from 'express';
import { RolesDto, RolesQueryDto } from './roles.dto';

@ApiTags('Roles')
@Controller({ version: ['1'], path: 'roles' })
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get()
  async index(@Query() query: RolesQueryDto, @Res() res: Response) {
    const r = await this.service.index(query);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.show(id);
    res.status(r.statusCode).send(r);
  }

  @Post()
  async create(@Body() body: RolesDto, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  async update(
    @Body() body: RolesDto,
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
