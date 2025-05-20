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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProvinceDto, ProvinceQueryDto } from './provinces.dto';
import { RoleGuard } from '@/common/guards/role/role.guard';
import { CacheRequestInterceptor } from '@/common/interceptor/cache-request/cache-request.interceptor';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';
import { ProvincesService } from './provinces.service';

@ApiTags('Administrative Area - Provinces')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseInterceptors(CacheRequestInterceptor)
@Controller({ version: ['1'], path: 'administrative-area/provinces' })
export class ProvincesController {
  constructor(private readonly service: ProvincesService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of provinces' })
  @OpenApiResponses([200, 400, 401, 403, 500])
  async index(@Query() query: ProvinceQueryDto, @Res() res: Response) {
    const r = await this.service.findAll(query);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get province by ID' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.findOneById(id);
    res.status(r.statusCode).send(r);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new province' })
  @OpenApiResponses([201, 400, 401, 403, 409, 500])
  async store(@Body() body: ProvinceDto, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update province by ID' })
  @OpenApiResponses([200, 400, 401, 403, 404, 409, 500])
  async update(
    @Param('id') id: string,
    @Body() body: ProvinceDto,
    @Res() res: Response,
  ) {
    const r = await this.service.update(id, body);
    res.status(r.statusCode).send(r);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete province by ID' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.destroy(id);
    res.status(r.statusCode).send(r);
  }
}
