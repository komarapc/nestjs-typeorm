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
import { SubdistrictsService } from './subdistricts.service';
import { SubdistrictDto, SubdistrictQueryDto } from './subdistricts.dto';
import { Response } from 'express';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';

@ApiTags('Administrative Area - Subdistricts')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseInterceptors(CacheRequestInterceptor)
@Controller({ version: ['1'], path: 'administrative-area/subdistricts' })
export class SubdistrictsController {
  constructor(private readonly service: SubdistrictsService) {}
  @Get()
  @ApiOperation({ summary: 'Get all subdistricts' })
  @OpenApiResponses([200, 400, 401, 403, 500])
  async index(@Query() query: SubdistrictQueryDto, @Res() res: Response) {
    const r = await this.service.findAll(query);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subdistrict by id' })
  @OpenApiResponses([200, 400, 401, 403, 500])
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.findById(id);
    res.status(r.statusCode).send(r);
  }

  @Post()
  @ApiOperation({ summary: 'Create subdistrict' })
  @OpenApiResponses([201, 400, 401, 403, 404, 409, 500])
  async store(@Body() body: SubdistrictDto, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update subdistrict' })
  @OpenApiResponses([200, 400, 401, 403, 404, 409, 500])
  async update(
    @Param('id') id: string,
    @Body() body: SubdistrictDto,
    @Res() res: Response,
  ) {
    const r = await this.service.update(id, body);
    res.status(r.statusCode).send(r);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete subdistrict' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.destroy(id);
    res.status(r.statusCode).send(r);
  }
}
