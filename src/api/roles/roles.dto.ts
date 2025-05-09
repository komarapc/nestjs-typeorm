import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Roles Schema', description: 'Roles Object Schema' })
export class RolesDto {
  @ApiProperty({ minLength: 3, maxLength: 10 })
  code: string;
  @ApiProperty({ minLength: 2 })
  name: string;
}
@ApiSchema({
  name: 'Roles Query Schema',
  description: 'Roles Query Object Schema',
})
export class RolesQueryDto {
  @ApiProperty({ required: false })
  code?: string;
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ default: 1 })
  page?: number;
  @ApiProperty({ default: 10 })
  limit?: number;
}
