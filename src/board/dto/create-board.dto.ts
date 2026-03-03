import { IsDate, IsString, MinLength } from "class-validator";



export class CreateBoardDto {
    @IsString()
    @MinLength(5)
    title: string;
}
