import { ApiProperty, ApiSchema } from '@nestjs/swagger';

import { Action } from '@/database/entity/permissions.entity';

@ApiSchema({ name: 'Permissions' })
export class PermissionsCreateDto {
  @ApiProperty({ description: 'Role ID' })
  role_id: string;
  @ApiProperty({ description: 'Resource ID' })
  resource_id: string;
  @ApiProperty({
    description: 'Resource Type',
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD', 'ALL'],
    example: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
  action: Array<Action>;
}
