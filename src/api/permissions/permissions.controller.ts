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
import { PermissionsService } from './permissions.service';
import { Response } from 'express';
import { PermissionQueryDto, PermissionsCreateDto } from './permissions.dto';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';
import { RoleGuard } from '@/common/guards/role/role.guard';
import { JwtAuthInterceptor } from '@/common/interceptor/jwt-auth/jwt-auth.interceptor';

@ApiTags('Permissions')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseInterceptors(JwtAuthInterceptor)
@Controller({ version: ['1'], path: 'permissions' })
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get Permissions' })
  @OpenApiResponses([200, 400, 404, 500])
  async index(@Query() query: PermissionQueryDto, @Res() res: Response) {
    const r = await this.service.index(query);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Permission' })
  @OpenApiResponses([200, 400, 404, 500])
  async show(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const r = await this.service.show(id);
    res.status(r.statusCode).send(r);
  }

  @Post()
  @ApiOperation({ summary: 'Create Permission' })
  @OpenApiResponses([201, 400, 404, 409, 500])
  async store(@Res() res: Response, @Body() body: PermissionsCreateDto) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Permission' })
  @OpenApiResponses([200, 400, 404, 409, 500])
  async update(
    @Param('id') id: string,
    @Body() body: PermissionsCreateDto,
    @Res() res: Response,
  ) {
    const r = await this.service.update(id, body);
    res.status(r.statusCode).send(r);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Permission' })
  @OpenApiResponses([200, 400, 404, 500])
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.destroy(id);
    res.status(r.statusCode).send(r);
  }
}
