import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Roles Schema', description: 'Roles Object Schema' })
export class RolesDto {
  @ApiProperty({ minLength: 3, maxLength: 10 })
  code: string;
  @ApiProperty({ minLength: 2 })
  name: string;
}
