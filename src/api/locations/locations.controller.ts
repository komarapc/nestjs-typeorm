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

import { LocationsService } from './locations.service';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';
import { LocationQueryDto, LocationsDto } from './locations.dto';
import { Response } from 'express';
import { RoleGuard } from '@/common/guards/role/role.guard';
import { CacheRequestInterceptor } from '@/common/interceptor/cache-request/cache-request.interceptor';

@ApiTags('Locations')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseInterceptors(CacheRequestInterceptor)
@Controller({ version: '1', path: 'locations' })
export class LocationsController {
  constructor(private readonly service: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async findAll(@Query() query: LocationQueryDto, @Res() res: Response) {
    const r = await this.service.findAll(query);
    res.status(r.statusCode).send(r);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new location',
    description: 'Organize storage location for products or items',
  })
  @OpenApiResponses([201, 400, 401, 403, 404, 500])
  async store(@Body() body: LocationsDto, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get location by ID' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.findOne(id);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update location by ID' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async update(
    @Param('id') id: string,
    @Body() body: LocationsDto,
    @Res() res: Response,
  ) {
    const r = await this.service.update(id, body);
    res.status(r.statusCode).send(r);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete location by ID' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.destroy(id);
    res.status(r.statusCode).send(r);
  }
}
