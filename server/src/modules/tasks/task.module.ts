import { Module } from '@nestjs/common';
import { FileService } from 'src/shared/file/file.service';
import { FileModule } from 'src/shared/file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    FileModule,
  ],
  providers: [TaskService, FileService],
  controllers: [TaskController],
})
export class TaskModule {}
