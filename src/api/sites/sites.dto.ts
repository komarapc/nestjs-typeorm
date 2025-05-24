import { ApiProperty, ApiSchema } from '@nestjs/swagger';

export class SitesAddressDto {
  @ApiProperty()
  provinceId?: string;
  @ApiProperty()
  regencyId?: string;
  @ApiProperty()
  subdistrictId?: string;
  @ApiProperty()
  villageId?: string;
  @ApiProperty()
  textAddress?: string;
}
@ApiSchema({ name: 'Sites' })
export class SitesDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: SitesAddressDto;
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
