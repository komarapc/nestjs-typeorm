import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Province' })
export class ProvinceDto {
  @ApiProperty({ description: 'Province code' })
  code: string;
  @ApiProperty({ description: 'Province name' })
  name: string;
}
@ApiSchema({ name: 'ProvinceQuery' })
export class ProvinceQueryDto {
  @ApiProperty({ description: 'Province code', required: false })
  code: string;
  @ApiProperty({ description: 'Province name', required: false })
  name: string;
  @ApiProperty({ description: 'Page number', default: 1 })
  page: number;
  @ApiProperty({ description: 'Page size', default: 10 })
  limit: number;
}
