import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema()
export class Todo extends Document {
  @Prop()
  name: string;

  @Prop()
  done: boolean;
};

export interface ITodoModel extends Model<Todo>{
  findDoneTodos: () => Promise<Todo[]>;
  findPendingTodos: () => Promise<Todo[]>;
}

const TodoSchema = SchemaFactory.createForClass(Todo);

TodoSchema.statics.findDoneTodos = async function () {
  return this.find({done: true});
}


export {TodoSchema};
