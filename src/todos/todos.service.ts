import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, ITodoModel } from './schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private readonly todoModel: ITodoModel) { }

  async getAllTodos(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async getDoneTodos(): Promise<Todo[]> {
    return this.todoModel.findDoneTodos();
  }

  async getPendingTodos(): Promise<Todo[]> {
    return this.todoModel.findPendingTodos();
  }
}
