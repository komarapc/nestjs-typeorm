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

import { AddressService } from './address.service';
import { CacheRequestInterceptor } from '@/common/interceptor/cache-request/cache-request.interceptor';
import { RoleGuard } from '@/common/guards/role/role.guard';
import { AddressDto, AddressQueryDto } from './address.dto';
import { Response } from 'express';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';

@ApiTags('Address')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseInterceptors(CacheRequestInterceptor)
@Controller({ version: ['1'], path: 'address' })
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Get()
  @ApiOperation({ summary: 'Get Address by Ref ID' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async index(@Query() q: AddressQueryDto, @Res() res: Response) {
    const r = await this.service.index(q);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Address by ID' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.findById(id);
    res.status(r.statusCode).send(r);
  }

  @Post()
  @ApiOperation({ summary: 'Create Address' })
  @OpenApiResponses([201, 400, 401, 403, 404, 409, 500])
  async store(@Body() body: AddressDto, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Address' })
  @OpenApiResponses([200, 400, 401, 403, 404, 409, 500])
  async update(
    @Param('id') id: string,
    @Body() body: AddressDto,
    @Res() res: Response,
  ) {
    const r = await this.service.update(id, body);
    res.status(r.statusCode).send(r);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Address' })
  @OpenApiResponses([200, 400, 401, 403, 404, 500])
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.destroy(id);
    res.status(r.statusCode).send(r);
  }
}
