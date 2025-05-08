import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Response } from 'express';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get()
  async index(@Res() res: Response) {}

  @Get(':id')
  async show(@Param('id') id: string, @Res() res: Response) {}

  @Post()
  async create(@Res() res: Response) {}

  @Put(':id')
  async update(@Param('id') id: string, @Res() res: Response) {}

  @Delete(':id')
  async destroy(@Param('id') id: string, @Res() res: Response) {}
}
