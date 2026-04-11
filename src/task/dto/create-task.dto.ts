import { IsDate, IsEnum, IsInt, IsString, MinLength } from "class-validator";
import { TaskStatus } from "src/generated/prisma/enums"


export class CreateTaskDto {

    @IsString()
    @MinLength(2)
    title!: string;

    @IsEnum(TaskStatus)
    status!: TaskStatus;


    @IsInt()
    boardId!: number;
    
   
}
