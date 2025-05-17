import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Sites' })
export class SitesDto {
  @ApiProperty()
  name: string;
}
@ApiSchema({ name: 'SitesQuery' })
export class SitesQueryDto {
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ default: 1 })
  page?: number;
  @ApiProperty({ default: 10 })
  limit?: number;
}
