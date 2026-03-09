import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  

  async create(dto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: dto
    });
  }

  async findAll() {
   return await this.prismaService.user.findMany(); 
  }


  async findbyTask(taskID: number) {
    return await this.prismaService.user.findMany({
      where: {tasks: {some: {id: taskID}
    }
  },
  select:{
    id:true,
    email: true,
    name: true,
    tasks:{
      select:{
        id: true,
        title: true,
        status: true} }
  }});
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({where: {id}});
  }



  async remove(id: number) {
    return  await this.prismaService.user.delete({where: {id}});
  }
}
