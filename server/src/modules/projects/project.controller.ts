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
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('/create')
  create(@Body() createUserDTO: CreateProjectDTO) {
    return this.projectService.create(createUserDTO);
  }

  @Post('/upload')
  upload(@Body() req: { id: ObjectId; params: string; value: string | Date }) {
    return this.projectService.upload(req);
  }

  @Post('/uploadFile')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file' }]))
  uploadFile(
    @UploadedFiles() files,
    @Body() req: { id: ObjectId; params: string },
  ) {
    const { file } = files;
    return this.projectService.uploadFile(req.id, req.params, file[0]);
  }

  @Get('/all')
  async findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.projectService.delete(id);
  }
}
