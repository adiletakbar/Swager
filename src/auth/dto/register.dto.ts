import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterRequest{


    @IsEmail({},{message:"email is not valid"})
    @IsNotEmpty({message:"email is required"})
    @IsString({message:"email must be a string"})
    email:string;


    @IsNotEmpty({message:"name is required"})
    @IsString({message:"name must be a string"})
    @MinLength(2,{message:"name must be at least 2 characters"})
    @MaxLength(50,{message:"name must be at most 20 characters"})
    name:string;


    @IsNotEmpty({message:"password is required"})
    @IsString({message:"password must be a string"})
    @MinLength(8,{message:"password must be at least 8 characters"})
    @MaxLength(20,{message:"password must be at most 20 characters"}) 
    password:string;
}