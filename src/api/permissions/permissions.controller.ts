import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { PermissionsService } from './permissions.service';

@ApiTags('permissions')
@Controller({ version: ['1'], path: 'permissions' })
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}
}
