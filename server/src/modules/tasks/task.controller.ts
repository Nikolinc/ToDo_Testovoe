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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Date, ObjectId } from 'mongoose';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('/create')
  create(@Body() createTaskDTO: CreateTaskDTO) {
    return this.taskService.create(createTaskDTO);
  }

  @Post('/upload')
  upload(@Body() req: { id: ObjectId; params: string; value: string | Date }) {
    return this.taskService.upload(req);
  }

  @Post('/uploadFile')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file' }]))
  uploadFile(
    @UploadedFiles() files,
    @Body() req: { id: ObjectId; params: string },
  ) {
    const { file } = files;
    return this.taskService.uploadFile(req.id, req.params, file[0]);
  }

  @Get('/all')
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Get('project/:project')
  getByProjectId(@Param('project') project: ObjectId) {
    return this.taskService.findByProjectId(project);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.taskService.delete(id);
  }
}
