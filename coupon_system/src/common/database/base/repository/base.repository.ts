import { Injectable } from '@nestjs/common';
import { IBaseRepositoryInterface } from './interfaces/base.repository.interface';

@Injectable()
export class BaseRepository implements IBaseRepositoryInterface {}
