import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
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

  async findAll() {
    return await this.prismaService.task.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.task.findUnique({where: {id}});
  }


  async remove(id: number) {
    return await this.prismaService.task.delete({where: {id}});
  }
}
