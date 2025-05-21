import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Villages Schema' })
export class VillagesDto {
  @ApiProperty()
  subdistrict_code: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  name: string;
}

@ApiSchema({ name: 'Villages Query' })
export class VillagesQueryDto {
  @ApiProperty({ required: false })
  subdistrict_code: string;
  @ApiProperty({ required: false })
  code: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ default: 1 })
  page: number;
  @ApiProperty({ default: 10 })
  limit: number;
}
