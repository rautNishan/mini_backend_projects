import { PartialType } from '@nestjs/swagger';
import { TestCreateDto } from './test.create.dto';

export class TestUpdateDto extends PartialType(TestCreateDto) {}
