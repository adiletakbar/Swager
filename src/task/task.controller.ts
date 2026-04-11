import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { Role } from 'src/generated/prisma/enums';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}


  @ApiOperation({ summary: 'Создание отзыва' })
  @ApiResponse({ status: 201, description: 'Отзыв успешно создан.' })
  @Authorization()
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Authorized('id') userId: number) {
    return this.taskService.create(createTaskDto, userId);
  }

  @ApiOperation({ summary: 'Получение всех отзывов' })
  @Get()
  findAll(@Query('boardId') boardId?: number, @Query('title') title?: string) {
    return this.taskService.findAll(boardId ? Number(boardId): undefined, title);
  }

  @Get(':id/board')
  findOneWithBoard(@Param('id') id: number) {
    return this.taskService.findOneWithBoard(+id);
  }

 @ApiOperation({ summary: 'Получение отзыва по ID' })
@Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(+id);
  }


  
  @ApiOperation({ summary: 'Редактирование своего отзыва' })
  @ApiResponse({
    status: 403,
    description: 'Нельзя редактировать чужой отзыв.',
  })
  @Authorization()
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
    @Authorized('id') userId: number,
  ) {
    return this.taskService.update(id, dto, userId);
  }

 

   @ApiOperation({ summary: 'Удаление отзыва' })
  @ApiResponse({ status: 403, description: 'Нельзя удалить чужой отзыв.' })
  @Authorization()
  @Delete(':id')
  remove(
    @Param('id') id: number,
    @Authorized('id') userId: number,
    @Authorized('role') userRole: Role, 
  ) {
    return this.taskService.remove(id, userId, userRole);
  }
}
