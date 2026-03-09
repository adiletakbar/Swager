import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({description:  'User email', example: 'l8KtZ@example.com'})
    @IsEmail()
    email: string;


    @ApiProperty({description:  'User name', example: 'John Doe'})
    @IsString()
    @MinLength(2)
    name: string;



    @ApiProperty({description:  'User password', example: '123456'})
    @IsString()
    @MinLength(6)
    password: string;

}
