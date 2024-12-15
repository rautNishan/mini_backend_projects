import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  IResponse,
  IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { BlogEntity } from '../entities/blogs.entity';
import { BlogService } from '../services/blog.service';

@Controller({
  path: 'blog',
})
export class BlogController {
  constructor(private readonly _blogService: BlogService) {}
  @Post('create')
  async create(@Body() body: any): Promise<IResponse<any>> {
    try {
      const data: BlogEntity = await this._blogService.create(body);
      return { data };
    } catch (error) {
      throw error;
    }
  }

  @Get('list')
  async list(): Promise<IResponsePaging<BlogEntity>> {
    const data = await this._blogService.paginatedGet({
      searchableColumns: ['name'],
      defaultSearchColumns: ['name'],
      defaultSortColumn: 'name',
      sortableColumns: ['createdAt', 'id', 'name'],
      options: {
        where: {},
      },
    });
    return data;
  }
}
