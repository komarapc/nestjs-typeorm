import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Local Auth' })
export class LocalSignInDto {
  @ApiProperty()
  email: string;
  @ApiProperty({ minLength: 8 })
  password: string;
}

@ApiSchema({ name: 'Local Sign In Roles' })
export class LocalSignInRolesDto {
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  role_id: string;
}
