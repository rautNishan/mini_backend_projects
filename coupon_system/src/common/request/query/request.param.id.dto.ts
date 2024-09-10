import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class RequestIdDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  id: number;
}
