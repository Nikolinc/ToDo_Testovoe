import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateUserDTO } from './dto/create-user.dto';
import { ObjectId } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  @Post('/uploadAvatar')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  uploadAvatar(@UploadedFiles() files, @Body() req: { id: ObjectId }) {
    console.log();
    const { avatar } = files;
    return this.userService.uploadAvatar(req.id, avatar[0]);
  }

  @Get('/all')
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get(':Email')
  getEmail(@Param('Email') Email: string) {
    return this.userService.findByEmail(Email);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.userService.delete(id);
  }
}
