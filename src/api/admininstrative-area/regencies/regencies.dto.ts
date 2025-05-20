import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Regency' })
export class RegencyDto {
  @ApiProperty()
  province_code: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  name: string;
}

@ApiSchema({ name: 'Regency Query' })
export class RegencyQueryDto {
  @ApiProperty({ required: false })
  province_code: string;
  @ApiProperty({ required: false })
  code: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ default: 1 })
  page: number;
  @ApiProperty({ default: 10 })
  limit: number;
}
