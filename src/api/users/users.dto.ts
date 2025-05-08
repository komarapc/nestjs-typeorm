import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'CreateUser' })
export class UsersCreateDto {
  @ApiProperty({
    description: 'Special characters are not allowed',
    minLength: 1,
  })
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty({ minLength: 8, example: 'password123' })
  password: string;
  @ApiProperty({ minLength: 8, example: 'password123' })
  passwordConfirmation: string;
}

@ApiSchema({ name: 'UserQuery' })
export class UsersQueryDto {
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  email?: string;
  @ApiProperty({ default: 1 })
  page?: number;
  @ApiProperty({ default: 10 })
  limit?: number;
}

@ApiSchema({ name: 'UpdateUser' })
export class UserUpdateDto {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  email?: string;
}

@ApiSchema({ name: 'UpdatePassword' })
export class UserUpdatePasswordDto {
  @ApiProperty({ minLength: 8, example: 'password123' })
  password: string;
  @ApiProperty({ minLength: 8, example: 'password123' })
  passwordConfirmation: string;
}
