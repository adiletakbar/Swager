import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { get } from "http";

import {getSwaggerConfig} from '../auth/config/swagger.config';



export function setupSwagger(app: INestApplication){
    const config = getSwaggerConfig();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);  
}