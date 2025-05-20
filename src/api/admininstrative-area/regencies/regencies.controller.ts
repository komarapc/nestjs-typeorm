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
import { RegenciesService } from './regencies.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '@/common/guards/role/role.guard';
import { CacheRequestInterceptor } from '@/common/interceptor/cache-request/cache-request.interceptor';
import { RegencyDto, RegencyQueryDto } from './regencies.dto';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';

@ApiTags('Administrative Area - Regency')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseInterceptors(CacheRequestInterceptor)
@Controller({ version: ['1'], path: 'administrative-area/regencies' })
export class RegenciesController {
  constructor(private readonly service: RegenciesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all regencies' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async index(@Query() query: RegencyQueryDto, @Res() res: Response) {
    const r = await this.service.findAll(query);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get regency by id' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.findById(id);
    res.status(r.statusCode).send(r);
  }

  @Post()
  @ApiOperation({ summary: 'Create regency' })
  @OpenApiResponses([201, 400, 401, 403, 404, 500])
  async store(@Body() body: RegencyDto, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update regency' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async update(
    @Param('id') id: string,
    @Body() body: RegencyDto,
    @Res() res: Response,
  ) {
    const r = await this.service.update(id, body);
    res.status(r.statusCode).send(r);
  }

  @Delete(':id')
  async detroy(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.destroy(id);
    res.status(r.statusCode).send(r);
  }
}
