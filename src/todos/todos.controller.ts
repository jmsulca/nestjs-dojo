import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('todos')
export class TodosController {

  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.getAllTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
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
