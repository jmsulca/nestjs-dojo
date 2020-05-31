import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<Todo>) { }

  async getAllTodos(): Promise<Todo[]> {
    return this.todoModel.find().exec();;
  }
}
