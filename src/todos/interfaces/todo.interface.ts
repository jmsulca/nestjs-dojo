import { Document } from 'mongoose';

export interface Todo extends Document {
  name: string;
  done: boolean;
}
