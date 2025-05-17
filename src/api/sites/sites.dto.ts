import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Sites' })
export class SitesDto {
  @ApiProperty()
  name: string;
}
