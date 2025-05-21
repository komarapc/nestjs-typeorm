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
import { VillagesService } from './villages.service';
import { Response } from 'express';
import { RoleGuard } from '@/common/guards/role/role.guard';
import { CacheRequestInterceptor } from '@/common/interceptor/cache-request/cache-request.interceptor';
import { VillagesDto, VillagesQueryDto } from './villages.dto';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';

@ApiTags('Administrative Area - Villages')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseInterceptors(CacheRequestInterceptor)
@Controller({ version: ['1'], path: 'administrative-area/villages' })
export class VillagesController {
  constructor(private readonly service: VillagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all villages' })
  @OpenApiResponses([200, 400, 401, 403, 500])
  async index(@Query() query: VillagesQueryDto, @Res() res: Response) {
    const r = await this.service.findAll(query);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a village by ID' })
  @OpenApiResponses([200, 400, 401, 404, 500])
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.findById(id);
    res.status(r.statusCode).send(r);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new village' })
  @OpenApiResponses([201, 400, 401, 403, 404, 409, 500])
  async store(@Body() body: VillagesDto, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a village' })
  @OpenApiResponses([200, 400, 401, 403, 404, 409, 500])
  async update(
    @Param('id') id: string,
    @Body() body: VillagesDto,
    @Res() res: Response,
  ) {
    const r = await this.service.update(id, body);
    res.status(r.statusCode).send(r);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a village' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.destroy(id);
    res.status(r.statusCode).send(r);
  }
}
