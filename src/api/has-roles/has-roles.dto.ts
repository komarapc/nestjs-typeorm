import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Has Role' })
export class HasRoleDto {
  @ApiProperty({ description: 'Role ID' })
  role_id: string;
  @ApiProperty({ description: 'User ID' })
  user_id: string;
}

@ApiSchema({ name: 'Has Role Query' })
export class HasRoleQueryDto {
  @ApiProperty({ description: 'User ID' })
  user_id: string;
  @ApiProperty({ default: 1 })
  page: number;
  @ApiProperty({ default: 10 })
  limit: number;
}
