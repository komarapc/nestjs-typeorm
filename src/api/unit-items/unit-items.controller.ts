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
  UseInterceptors,
} from '@nestjs/common';

import { CacheRequestInterceptor } from '@/common/interceptor/cache-request/cache-request.interceptor';
import { RoleGuard } from '@/common/guards/role/role.guard';
import { UnitItemsService } from './unit-items.service';
import { UnitItemDto, UnitItemQueryDto } from './unit-items.dto';
import { Response } from 'express';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';

@ApiTags('Unit Items')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseInterceptors(CacheRequestInterceptor)
@Controller({ version: ['1'], path: 'unit-items' })
export class UnitItemsController {
  constructor(private readonly service: UnitItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get unit items' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async index(@Query() query: UnitItemQueryDto, @Res() res: Response) {
    const r = await this.service.findAll(query);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get unit item' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.findOne(id);
    res.status(r.statusCode).send(r);
  }

  @Post()
  @ApiOperation({ summary: 'Create unit item' })
  @OpenApiResponses([201, 400, 401, 403, 404, 500])
  async store(@Body() body: UnitItemDto, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update unit item' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async update(
    @Param('id') id: string,
    @Body() body: UnitItemDto,
    @Res() res: Response,
  ) {
    const r = await this.service.update(id, body);
    res.status(r.statusCode).send(r);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete unit item' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.destroy(id);
    res.status(r.statusCode).send(r);
  }
}
