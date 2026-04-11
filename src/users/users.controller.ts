import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ParseIntPipe} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enums';
import { Authorized } from 'src/auth/decorators/authorized.decorator';



@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

@Authorization()
@Get('profile')
async getProfile(@Authorized('id') id: number) {
  return this.usersService.getProfile(id);
}

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }



  @Roles(Role.ADMIN)
  @Get()
  findall(){
    return this.usersService.findAll();
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: Number) {
    return this.usersService.remove(+id);
  }
}
