# Nestjs Crash course

## Creating your first project
`npm i -g @nestjs/cli`

`nest new project-name`

## Getting familiar with the CLI
https://docs.nestjs.com/cli/usages#nest-generate

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
