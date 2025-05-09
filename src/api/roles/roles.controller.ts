import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Response } from 'express';
import { RolesDto } from './roles.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get()
  async index(@Res() res: Response) {}

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
  async update(@Param('id') id: string, @Res() res: Response) {}

  @Delete(':id')
  async destroy(@Param('id') id: string, @Res() res: Response) {}
}
