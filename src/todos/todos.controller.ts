import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('To Dos')
@Controller('todos')
export class TodosController {

  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(@Query('page') page: number, @Query('size') size: number) {
    const data = await this.todosService.getAllTodos();
    return {data, page: page, size: size};
  }

  @Get('done')
  findDone() {
    return this.todosService.getDoneTodos();
  }

  @Get('pending')
  findPending() {
    return this.todosService.getPendingTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      id,
      name: '',
      done: false,
    };
  }

  @Post()
  @HttpCode(200)
  create(@Body() payload: any) {
    return payload;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    throw new HttpException({ id , notImplemented: true}, HttpStatus.NOT_FOUND);
  }
}
