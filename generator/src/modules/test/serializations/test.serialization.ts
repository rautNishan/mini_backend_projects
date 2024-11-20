import { ApiProperty } from '@nestjs/swagger';
import {
  ResponseDefaultSerialization,
  ResponsePaginationDefaultSerialization,
} from 'src/common/doc/serializations/response.default.serialization';
import { TestEntity } from '../repository/entities/test.entity';

export class TestSerialization extends ResponseDefaultSerialization {
  @ApiProperty({
    type: TestEntity,
  })
  data: TestEntity;
}

export class TestPaginationSerialization extends ResponsePaginationDefaultSerialization {
  @ApiProperty({
    type: [TestEntity],
  })
  data: TestEntity;
}
