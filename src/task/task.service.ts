import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { title } from 'node:process';
@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}
  
/**
 * Create a task
 * @param {CreateTaskDto} createTaskDto - The request body.
 * @returns {Promise<Task>} - The created task.
 */

  async create(dto: CreateTaskDto) {
    return await this.prismaService.task.create({data: dto});
  }

  async findAll(boardId?: number, title?: string) {
    return await this.prismaService.task.findMany(
      {
        where:{
          boardId: boardId ? boardId : undefined,
          title: title ? {contains: title, mode: 'insensitive'} : undefined
        }
        
      }
    );
  }

  async findOne(id: number) {
    return await this.prismaService.task.findUnique({where: {id}});
  }


  async findOneWithBoard(id: number) {
    return  this.prismaService.task.findUnique({
      where: {id},
      include: {
        board: true
      }
    });

  }

  











  async remove(id: number) {
    return await this.prismaService.task.delete({where: {id}});
  }
}
