import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Subdistrict' })
export class SubdistrictDto {
  @ApiProperty()
  regency_code: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  name: string;
}
@ApiSchema({ name: 'Subdistricts Query' })
export class SubdistrictQueryDto {
  @ApiProperty({ required: false })
  regency_code: string;
  @ApiProperty({ required: false })
  code: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ default: 1 })
  page: number;
  @ApiProperty({ default: 10 })
  limit: number;
}
