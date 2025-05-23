import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';

import { CacheRequestInterceptor } from '@/common/interceptor/cache-request/cache-request.interceptor';
import { RoleGuard } from '@/common/guards/role/role.guard';
import { UnitConversionsService } from './unit-conversions.service';

@ApiTags('Unit Conversions')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseInterceptors(CacheRequestInterceptor)
@Controller({ version: ['1'], path: 'unit-conversions' })
export class UnitConversionsController {
  constructor(private readonly service: UnitConversionsService) {}
}
