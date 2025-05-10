import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { HasRolesService } from './has-roles.service';
import { HasRoleDto, HasRoleQueryDto } from './has-roles.dto';
import { Response } from 'express';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';

@ApiTags('Has Roles')
@Controller({ version: ['1'], path: 'has-roles' })
export class HasRolesController {
  constructor(private readonly service: HasRolesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @OpenApiResponses([200, 400, 500])
  async index(@Query() query: HasRoleQueryDto, @Res() res: Response) {
    const r = await this.service.index(query);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role' })
  @OpenApiResponses([200, 400, 404, 500])
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.show(id);
    res.status(r.statusCode).send(r);
  }

  @Post()
  @ApiOperation({ summary: 'Add a role' })
  @OpenApiResponses([201, 400, 404, 409, 500])
  async store(@Body() body: HasRoleDto, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  async update(
    @Body() body: HasRoleDto,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const r = await this.service.update(id, body);
    res.status(r.statusCode).send(r);
  }
}
