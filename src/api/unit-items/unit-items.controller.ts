import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';

import { CacheRequestInterceptor } from '@/common/interceptor/cache-request/cache-request.interceptor';
import { RoleGuard } from '@/common/guards/role/role.guard';
import { UnitItemsService } from './unit-items.service';

@ApiTags('Unit Items')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseInterceptors(CacheRequestInterceptor)
@Controller('unit-items')
export class UnitItemsController {
  constructor(private readonly service: UnitItemsService) {}
}
