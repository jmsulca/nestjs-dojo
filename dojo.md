# Nestjs Crash course

## Creating your first project
`npm i -g @nestjs/cli`

`nest new project-name`

## Getting familiar with the CLI
https://docs.nestjs.com/cli/usages#nest-generate

## Creating a module
`nest generate module <module-name>`

## Creating a controller
`nest generate controller <controller-name>`

## Creating a service
`nest g s <service-name>`

## Adding swagger ui
### Install swagger
`npm install --save @nestjs/swagger swagger-ui-express`

### Swagger Configuration
Add this lines to src/main.ts
```javascript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const options = new DocumentBuilder()
    .setTitle('Todos API')
    .setDescription('Todo manipulation API')
    .setVersion('0.9')
    .build();
const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
```

## Adding a database
### Installing Mongoose
`npm install --save @nestjs/mongoose mongoose`

`npm install --save-dev @types/mongoose`

Add mongoose to the app.module
```javascript
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/todos')],
})
```
### Create the Todo class
```javascript
//#/src/todos/schemas/todo.schema.ts
@Schema()
export class Todo extends Document {
  @Prop()
  name: string;

  @Prop()
  done: boolean;
};
```
### Create the model interface
```javascript
export interface ITodoModel extends Model<Todo>{
  findDoneTodos: () => Promise<Todo[]>;
  findPendingTodos(): Promise<Todo[]>;
}
```

### Create the Schema
```javascript
const TodoSchema = SchemaFactory.createForClass(Todo);
```

### Add static methods
```javascript
TodoSchema.statics.findDoneTodos = async function () {
  return this.find({done: true});
}
```

### Add to imports in the todo.module
```javascript
@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema, collection: 'todo' }])],
  controllers: [TodosController],
  providers: [TodosService],
})
```

## Add database model connection to the service
```javascript
constructor(@InjectModel(Todo.name) private readonly todoModel: ITodoModel) { }
```

### Use the model
```javascript
async getDoneTodos(): Promise<Todo[]> {
    return this.todoModel.findDoneTodos();
}
```

## Tasks
- Solve failing tests
- Create a simple CRUD for Users
- Implement Guard for routes

# Some links
https://docs.nestjs.com/
https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1