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
import { UnitConversionsService } from './unit-conversions.service';
import {
  UnitConversionDto,
  UnitConversionQueryDto,
} from './unit-conversions.dto';
import { Response } from 'express';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';

@ApiTags('Unit Conversions')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseInterceptors(CacheRequestInterceptor)
@Controller({ version: ['1'], path: 'unit-conversions' })
export class UnitConversionsController {
  constructor(private readonly service: UnitConversionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all unit conversions' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async index(@Query() q: UnitConversionQueryDto, @Res() res: Response) {
    const r = await this.service.findAll(q);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get unit conversion by ID' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.findOne(id);
    res.status(r.statusCode).send(r);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new unit conversion' })
  @OpenApiResponses([201, 400, 401, 403, 404, 409, 500])
  async store(@Body() body: UnitConversionDto, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a unit conversion' })
  @OpenApiResponses([200, 400, 401, 403, 404, 409, 500])
  async update(
    @Param('id') id: string,
    @Body() body: UnitConversionDto,
    @Res() res: Response,
  ) {
    const r = await this.service.update(id, body);
    res.status(r.statusCode).send(r);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a unit conversion' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.destroy(id);
    res.status(r.statusCode).send(r);
  }
}
