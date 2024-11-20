import { faker } from '@faker-js/faker';
import {
    ApiProperty,
    IntersectionType,
    OmitType,
    PickType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { INotification } from '../interfaces/notification.interface';


export class NotificationCreateDto implements Partial<INotification>{
    @ApiProperty({
        example: faker.person.jobTitle(),
        required: true,
        minLength: 1,
        maxLength: 255,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(255)
    name: string;
}
