import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Locations' })
export class LocationsDto {
  @ApiProperty({ type: String, format: 'uuid' })
  site_id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false })
  description?: string;
}
@ApiSchema({ name: 'LocationQuery' })
export class LocationQueryDto {
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ default: 1 })
  page?: number;
  @ApiProperty({ default: 10 })
  limit?: number;
}
