import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Response } from 'express';
import { PermissionsCreateDto } from './permissions.dto';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';

@ApiTags('permissions')
@Controller({ version: ['1'], path: 'permissions' })
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Permission' })
  @OpenApiResponses([201, 400, 404, 409, 500])
  async store(@Res() res: Response, @Body() body: PermissionsCreateDto) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }
}
