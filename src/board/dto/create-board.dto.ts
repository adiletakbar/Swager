import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, MinLength } from "class-validator";



export class CreateBoardDto {
    @ApiProperty({description:  'Board title'})
    @IsString()
    @MinLength(5)
    title: string;
}
