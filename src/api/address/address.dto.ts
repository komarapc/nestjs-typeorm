import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Address' })
export class AddressDto {
  @ApiProperty()
  ref_id: string;
  @ApiProperty()
  province_id: string;
  @ApiProperty()
  regency_id: string;
  @ApiProperty()
  subdistrict_id: string;
  @ApiProperty()
  village_id: string;
  @ApiProperty({ required: false })
  text_address: string;
}

@ApiSchema({ name: 'Address Query' })
export class AddressQueryDto {
  @ApiProperty()
  ref_id: string;
}
