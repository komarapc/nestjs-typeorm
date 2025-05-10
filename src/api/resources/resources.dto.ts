import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Resources Schema' })
export class ResourcesDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  path: string;
}

@ApiSchema({ name: 'Resources Bulk Schema' })
export class ResourcesBulkDto {
  @ApiProperty({ type: [ResourcesDto] })
  items: ResourcesDto[];
}

@ApiSchema({ name: 'Resources Query Schema' })
export class ResourcesQueryDto {
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  path?: string;
  @ApiProperty()
  page?: number;
  @ApiProperty()
  limit?: number;
}
