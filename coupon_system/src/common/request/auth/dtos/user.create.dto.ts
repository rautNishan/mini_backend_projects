import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  IFullName,
  IUser,
} from 'src/modules/user/interfaces/user.entity.interface';

export class FullNameDto implements IFullName {
  @ApiProperty({
    example: faker.person.firstName(),
    required: true,
    description: 'User first name.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: faker.person.middleName(),
    required: false,
    description: 'User middle name.',
  })
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    required: true,
    example: faker.person.lastName(),
    description: 'User last name.',
  })
  lastName: string;
}

export class UserCreateDto implements IUser {
  @ApiProperty({
    type: FullNameDto,
  })
  @ValidateNested({ each: true })
  @Type(() => FullNameDto)
  @IsNotEmpty()
  fullName: FullNameDto;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: faker.internet.email(),
    required: true,
    description: 'User email.',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'User Contact number.',
    example: '9090909090',
  })
  contactNumber: string;
}
