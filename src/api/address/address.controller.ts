import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';

import { CacheRequestInterceptor } from '@/common/interceptor/cache-request/cache-request.interceptor';
import { RoleGuard } from '@/common/guards/role/role.guard';

@ApiTags('Address')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@UseInterceptors(CacheRequestInterceptor)
@Controller('address')
export class AddressController {}
