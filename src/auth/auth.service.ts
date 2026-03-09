import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterRequest } from './dto/register.dto';
import { hash } from 'argon2';
import {JwtService} from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET:string;
  private readonly JWT_ACCESS_TOKEN_TTL:string;
  private readonly JWT_REFRESH_TOKEN_TTL:string;



  constructor(
    private readonly prisma: PrismaService,
    private readonly configService:ConfigService,
    private readonly jwtService:JwtService
  ) {

    this.JWT_SECRET = this.configService.getOrThrow<string>('JWT_SECRET');
    this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');

  }
 
  async register(dto:RegisterRequest){
    const {email,name,password} = dto;

    const existingUser = await this.prisma.user.findUnique({
      where:{email}
    });

    if(existingUser){
      throw new Error('User already exists');
    }
      
    const user = await this.prisma.user.create({
      data:{email,
        name,
        password: await hash(password),},

    });
      return this.generateTokens(user.id)
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

  }





