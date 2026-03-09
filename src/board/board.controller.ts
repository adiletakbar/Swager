import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}


@ApiOperation({ summary: 'Create board' })
@ApiResponse({ status: 200, type: CreateBoardDto})
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }
@ApiOperation({ summary: 'Get all boards' })
@ApiResponse({ status: 200, type: [CreateBoardDto]})
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

@ApiOperation({ summary: 'Get board by task' })
@ApiResponse({ status: 200, type: [CreateBoardDto]})
  @Get('tasks/:id')
  findByTask(@Param('id') taskId: number) {
    return this.boardService.findByTask(+taskId);
  }


@ApiOperation({ summary: 'Get board by id' })
@ApiResponse({ status: 200, type: CreateBoardDto})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }


@ApiOperation({ summary: 'Delete board by id' })
@ApiResponse({ status: 200, type: CreateBoardDto})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
