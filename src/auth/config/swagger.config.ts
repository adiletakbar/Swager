import { DocumentBuilder } from "@nestjs/swagger";


export function getSwaggerConfig(){
    return new DocumentBuilder()
    .setTitle('Boards App')
    .setDescription('The Boards App API description')
    .setVersion('1.0')
    .addTag('boards')
    .addTag('users')
    .addTag('tasks')
    .addBearerAuth()
    .build();

}