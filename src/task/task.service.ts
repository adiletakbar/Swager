import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { title } from 'node:process';
import { ForbiddenException } from '@nestjs/common';
import { Role } from 'src/generated/prisma/enums';
@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}
  
/**
 * Create a task
 * @param {CreateTaskDto} createTaskDto - The request body.
 * @returns {Promise<Task>} - The created task.
 */

  async create(dto: CreateTaskDto, userId: number) {
    return await this.prismaService.task.create(
      {data:{
        title: dto.title,
        status: dto.status,
        boardId: dto.boardId,
        userId: userId}});
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
    });}



    
  async update(id: number, dto: UpdateTaskDto, userId: number) {
    const task = await this.prismaService.task.findUnique({ where: { id } });

    if (!task) throw new NotFoundException('Отзыв не найден');

    // Only the owner can edit their review
    if (task.userId !== userId) {
      throw new ForbiddenException('Вы можете редактировать только свой отзыв');
    }

    return await this.prismaService.task.update({ where: { id }, data: dto });
  }

    async remove(id: number, userId: number, userRole: Role) {
    const task = await this.prismaService.task.findUnique({ where: { id } });

    if (!task) throw new NotFoundException('Отзыв не найден');

    // Admins can delete any review; regular users only their own
    if (userRole !== Role.Admin && task.userId !== userId) {
      throw new ForbiddenException('Вы можете удалять только свои отзывы');
    }

    return await this.prismaService.task.delete({ where: { id } });
  }
}
