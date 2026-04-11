import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { Response, Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import type { User } from 'src/generated/prisma/client';
import { Public } from './decorators/public.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



@Public()
@ApiOperation({ summary: 'Register user' })
 @Post('register')
 @HttpCode(HttpStatus.CREATED)
 async register(
  @Res({passthrough: true}) res:Response,
  @Body() dto:RegisterRequest) {
   return this.authService.register(res,dto);
 }




@Public()
@ApiOperation({ summary: 'Login user' })
@Post('login')
 @HttpCode(HttpStatus.OK)
 async login(
  @Res({passthrough: true}) res:Response,
  @Body() dto:LoginRequest,) {
   return this.authService.login(res,dto);
 }

@Public()
@ApiOperation({ summary: 'Refresh token' })
 @Post('refresh')
 @HttpCode(HttpStatus.OK)
 async refresh(
  @Res({passthrough: true}) res:Response,
  @Req() req:Request,) {
   return this.authService.refresh(req,res);
 }


 @Post('logout')
 @HttpCode(HttpStatus.OK)
 async logout(@Res({passthrough: true}) res:Response){
  return this.authService.logout(res); 
 }


 //@UseGuards(AuthGuard('jwt'))
 @Authorization()
 @Get('me')
 @HttpCode(HttpStatus.OK)
 async me(@Authorized() user:User){
   return user;
 }





}
 