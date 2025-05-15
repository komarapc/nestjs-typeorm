import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Local Auth' })
export class LocalSignInDto {
  @ApiProperty()
  email: string;
  @ApiProperty({ minLength: 8 })
  password: string;
}
