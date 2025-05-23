import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Controller } from '@nestjs/common';

@ApiTags('Unit Conversions')
@ApiBearerAuth()
@Controller({ version: ['1'], path: 'unit-conversions' })
export class UnitConversionsController {}
