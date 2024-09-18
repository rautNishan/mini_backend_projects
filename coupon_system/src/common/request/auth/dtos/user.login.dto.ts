import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    type: String,
    example: faker.internet.email(),
    description: 'Email address of admin',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: faker.internet.password(),
    description: 'Password of admin',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
