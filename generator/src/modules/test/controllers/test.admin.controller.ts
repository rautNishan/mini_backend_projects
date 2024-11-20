import {
    Controller,
    Get,
    Post,
    Delete,
    NotFoundException,
    Param,
    Patch,
    Body,
    Query,
    SerializeOptions,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  import { ADMIN_ONLY_GROUP } from 'src/common/database/constant/serialization-group.constant';
  import { ApiDocs } from 'src/common/doc/common-docs';
  import { PaginateQueryDto } from 'src/common/doc/query/paginateQuery.dto';
  import { ResponseMessage } from 'src/common/response/decorators/responseMessage.decorator';
  import {
    IResponse,
    IResponsePaging,
  } from 'src/common/response/interfaces/response.interface';
  import { TestCreateDto } from '../dtos/test.create.dto';
  import { TestUpdateDto } from '../dtos/test.update.dto';
  import { TestEntity } from '../repository/entities/test.entity';
  import { TestService } from '../services/test.service';
  import { TestPaginationSerialization, TestSerialization } from '../serializations/test.serialization';
  import { UserProtected } from 'src/common/auth/decorators/auth.decorators';
  import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
  import { IdParamDto } from 'src/common/dto/id-param.dto';
  import { CustomResponseDecorator } from 'src/common/auth/decorators/custom.response.decorators';
  import { FindAllQueryDto } from 'src/common/doc/query/getAllQuery.dto';
  import { DataSource, FindOptionsWhere, In } from 'typeorm';
  
  
  @SerializeOptions({
    groups: ADMIN_ONLY_GROUP,
  })
  @ApiTags('Test')
  @Controller('test')
  export class TestAdminController {
    constructor(
      private readonly testService: TestService,
      private connection: DataSource,
  ) {}
  
    @ApiDocs({
      operation: 'Create Test.',
      serialization: TestSerialization,
    })
    @ResponseMessage('Test created successfully.')
    @Post()
    async create(@Body() body: TestCreateDto): Promise<IResponse<any>> {
      try {
        const data: TestEntity = await this.testService.create(body);
        return { data };
      } catch (error) {
        throw error;
      }
    }
  
  
    @ApiDocs({
      operation: 'List Test',
      serialization: TestPaginationSerialization,
    })
    @ResponseMessage('Test list with pagination retrieved successfully.')
    @Get()
    async list(
      @Query() paginateQueryDto: PaginateQueryDto,
    ): Promise<IResponsePaging<TestEntity>> {
      const data = await this.testService.paginatedGet({
        ...paginateQueryDto,
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
  
    @ApiDocs({
      operation: 'List all Test without pagination',
      serialization: TestPaginationSerialization,
    })
    @UserProtected()
    @ResponseMessage('Test list retrieved successfully.')
    @Get('/all')
    async listAll(
      @Query() findAllQueryDto: FindAllQueryDto,
    ): Promise<IResponse<TestEntity[]>> {
      const where: FindOptionsWhere<TestEntity> = {};
  
      if (findAllQueryDto.ids?.length > 0) {
        where.id = In(findAllQueryDto.ids);
      }
  
      const data = await this.testService.getAll({
        options: {
          where,
        },
      });
      return { data };
    }
  
  
    @ApiDocs({
      operation: 'Get Test',
      serialization: TestSerialization,
      params: [
        {
          type: 'number',
          required: true,
          name: 'id',
        },
      ],
    })
    @UserProtected()
    @RequestParamGuard(IdParamDto)
    @ResponseMessage('Test retrieved successfully.')
    @Get(':id')
    async getById(@Param('id') id: number): Promise<IResponse<TestEntity>> {
      const data = await this.testService.getById(id, {
        options: {
          select: {
            id: true,
            name: true,
          },
        },
      });
      if (!data) throw new NotFoundException('Cannot find Test');
      return { data };
    }
  
    @ApiDocs({
      operation: 'Restore Test',
      serialization: TestSerialization,
      params: [
        {
          type: 'number',
          required: true,
          name: 'id',
        },
      ],
    })
    @UserProtected()
    @CustomResponseDecorator()
    @RequestParamGuard(IdParamDto)
    @ResponseMessage('Test restored successfully.')
    @Patch(':id/restore')
    async restoreById(
      @Param('id') id: number,
    ): Promise<IResponse<TestEntity>> {
      await this.testService.restore({ where: { id } });
      const data: TestEntity | null = await this.testService.getById(id);
      if (!data) throw new NotFoundException('Cannot find Test');
      return { data };
    }
  
    @ApiDocs({
      operation: 'Update Test',
      serialization: TestSerialization,
      params: [
        {
          type: 'number',
          required: true,
          name: 'id',
        },
      ],
    })
    @UserProtected()
    @RequestParamGuard(IdParamDto)
    @ResponseMessage('Test updated successfully.')
    @Patch(':id')
    async updateById(
      @Param('id') id: number,
      @Body() updateTestData: TestUpdateDto,
    ): Promise<IResponse<TestEntity>> {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.startTransaction();
      try {
        const found: TestEntity | null = await this.testService.getById(id);
        if (!found) throw new NotFoundException('Cannot find Test');
        await this.testService.update(found, updateTestData, {
          entityManager: queryRunner.manager,
        });
        await queryRunner.commitTransaction();
        return await this.getById(id);
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    }
  
    @ApiDocs({
      operation: 'Delete Test',
      serialization: TestSerialization,
      params: [
        {
          type: 'number',
          required: true,
          name: 'id',
        },
      ],
    })
    @UserProtected()
    @CustomResponseDecorator()
    @RequestParamGuard(IdParamDto)
    @ResponseMessage('Test deleted successfully.')
    @Delete(':id/hard')
    async deleteById(@Param('id') id: number): Promise<IResponse<TestEntity>> {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.startTransaction();
      try {
        const found: TestEntity | null = await this.testService.getById(id);
        if (!found) throw new NotFoundException('Cannot find Test');
        const data = await this.testService.delete(found, {
          entityManager: queryRunner.manager,
        });
        await queryRunner.commitTransaction();
        return { data };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        queryRunner.release();
      }
    }
  
    @ApiDocs({
      operation: 'Soft delete Test',
      serialization: TestSerialization,
      params: [
        {
          type: 'number',
          required: true,
          name: 'id',
        },
      ],
    })
    @UserProtected()
    @CustomResponseDecorator()
    @RequestParamGuard(IdParamDto)
    @ResponseMessage('Test soft deleted successfully.')
    @Delete('/:id')
    async softDeleteById(
      @Param('id') id: number,
    ): Promise<IResponse<TestEntity>> {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.startTransaction();
      try {
        const found: TestEntity | null = await this.testService.getById(id);
        if (!found) throw new NotFoundException('Cannot find Test');
        const data = await this.testService.softDelete(found, {
          entityManager: queryRunner.manager,
        });
        await queryRunner.commitTransaction();
        return { data };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    }
  }
  