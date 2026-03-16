import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterRequest } from './dto/register.dto';
import { hash,verify } from 'argon2';
import {JwtService} from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginRequest } from './dto/login.dto';
import { NotFoundError, sampleTime } from 'rxjs';
import { isDev } from 'src/utils/is-dev-utils';
import type { Request,Response } from 'express';
import { JwtPayload } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET:string;
  private readonly JWT_ACCESS_TOKEN_TTL:string;
  private readonly JWT_REFRESH_TOKEN_TTL:string;
  private readonly COOKIE_DOMAIN:string;



  constructor(
    private readonly prisma: PrismaService,
    private readonly configService:ConfigService,
    private readonly jwtService:JwtService
  ) {

    this.JWT_SECRET = this.configService.getOrThrow<string>('JWT_SECRET');
    this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');
    this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('COOKIE_DOMAIN'); 

  }
 
  async register(res:Response, dto:RegisterRequest){
    const {email,name,password} = dto;

    const existingUser = await this.prisma.user.findUnique({
      where:{email}
    });

    if(existingUser){
      throw new ConflictException('User already exists');
    }
      
    const user = await this.prisma.user.create({
      data:{email,
        name,
        password: await hash(password),},

    });
      return this.auth(res, user.id)
    }
    async login(res:Response,  dto: LoginRequest){
      const {email,password} = dto;
      const user = await this.prisma.user.findUnique({
        where: {email},
        select: {id:true,password:true},
      });


      if (!user){
        throw new NotFoundException("Пользователь с таким  именем не существует");

      }

      const isPasswordValid = await verify(user.password,password);
      if (!isPasswordValid){
        throw new NotFoundException("Пароль неверен");
      }
      return this.auth(res,user.id); 
    }


    async refresh(req:Request , res:Response   ){
      const refreshToken = req.cookies['refreshToken'];

      if (!refreshToken){
        throw new UnauthorizedException('Refresh token not found');
      }

      const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);


      if (payload){
        const user = await this.prisma.user.findUnique({
          where:{id: Number(payload.id)},
          select:{id:true}
        });      


        if (!user){
        throw new NotFoundException('User not found');
      } 

      return this.auth(res, user.id);
    }
    }


    async logout(res:Response){
      this.setCookies(res,'',new Date(0));
      return {message: "Вы успешно вышли из аккаунта"}

    }




    private auth(res:Response,id: number){
      const {accessToken,refreshToken} = this.generateTokens(id);
      this.setCookies(res,refreshToken, new Date(Date.now() + 60*60*24*1000));
      return {accessToken};
    }


    private generateTokens(id: number) {
      const payload = { id};
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: this.JWT_ACCESS_TOKEN_TTL as unknown as any,
        secret: this.JWT_SECRET,
      });
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: this.JWT_REFRESH_TOKEN_TTL as unknown as any,
      });
      return { accessToken, refreshToken };
    }

    



    private setCookies(res: Response, token: string, expires:Date){
      res.cookie('refreshToken', token, {
        expires,
        httpOnly: true,
        domain: this.COOKIE_DOMAIN,
        secure:!isDev(this.configService),
        sameSite:!isDev(this.configService)?'none':'lax',
      })

    }




  }





