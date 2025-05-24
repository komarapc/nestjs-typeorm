import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Unit Conversion' })
export class UnitConversionDto {
  @ApiProperty({ format: 'uuid', description: 'ID of unit item' })
  from_unit_id: string;
  @ApiProperty({ format: 'uuid', description: 'ID of unit item' })
  to_unit_id: string;
  @ApiProperty({ description: 'Conversion factor from one unit to another' })
  conversion_factor: number;
}

@ApiSchema({ name: 'Unit Conversion List' })
export class UnitConversionQueryDto {
  @ApiProperty({
    format: 'uuid',
    description: 'ID of unit item',
    required: false,
  })
  from_unit_id: string;
  @ApiProperty({
    format: 'uuid',
    description: 'ID of unit item',
    required: false,
  })
  to_unit_id: string;
  @ApiProperty({ default: 1 })
  page: number;
  @ApiProperty({ default: 10 })
  limit: number;
}
