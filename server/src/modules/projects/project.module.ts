import { Module } from '@nestjs/common';
import { FileService } from 'src/shared/file/file.service';
import { FileModule } from 'src/shared/file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schema';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    FileModule,
  ],
  providers: [ProjectService, FileService],
  controllers: [ProjectController],
})
export class ProjectModule {}
