import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Unit Item' })
export class UnitItemDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  abbreviation: string;
}
@ApiSchema({ name: 'Unit Item Query' })
export class UnitItemQueryDto {
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  abbreviation: string;
  @ApiProperty({ default: 1 })
  page: number;
  @ApiProperty({ default: 10 })
  limit: number;
}
