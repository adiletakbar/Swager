import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class LoginRequest{
    @IsEmail({},{message:"Не корректный email"})
    @IsNotEmpty({message:"Не должен быть пустым"})
    @IsString({message:"Должент быть строкой"})
    email:string    


    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message:"Минимум 6 символов"})
    @MaxLength(20,{message:"Максимум 20 символов"})
    password:string
}