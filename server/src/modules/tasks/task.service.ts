import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Date } from 'mongoose';
import { FileService } from 'src/shared/file/file.service';
import { Priority, Status, Task } from './schemas/task.schema';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private TaskModel: Model<Task>,
    private fileService: FileService,
  ) {}

  async create(taskDTO: CreateTaskDTO): Promise<Task[]> {
    const createdTask = await this.TaskModel.create({
      ...taskDTO,
    });
    createdTask.createDate = new Date(taskDTO.createDate);
    createdTask.expirationDate = new Date(taskDTO.expirationDate);
    createdTask.currentStatus = Status.Queue;
    if (!createdTask.priority) createdTask.priority = Priority.Low;
    createdTask.save();
    const project = createdTask.project;
    return await this.TaskModel.find({ project }).exec();
  }

  async upload(req: {
    id: ObjectId;
    params: string;
    value: string | Date;
  }): Promise<Task[]> {
    const task = await this.TaskModel.findById(req.id);
    task[req.params] = req.value;
    task.save();
    const project = task.project;
    return await this.TaskModel.find({ project }).exec();
  }

  async uploadFile(id: ObjectId, params: string, imageFile): Promise<Task[]> {
    const task = await this.TaskModel.findById(id);
    const imagePath = this.fileService.createFile(
      `project/${params}`,
      imageFile,
    );
    task[params] = imagePath;
    task.save();
    return [task];
  }

  async findAll(): Promise<Task[]> {
    return this.TaskModel.find().exec();
  }

  async findByProjectId(project: ObjectId): Promise<Task[]> {
    const task = await this.TaskModel.find({ project }).exec();
    return task;
  }

  async findById(id: string): Promise<Task[]> {
    const task = await this.TaskModel.findById(id);
    return [task];
  }

  async delete(id: ObjectId): Promise<any> {
    const task = await this.TaskModel.findById(id);
    this.fileService.remoweFile(task.file);
    return (await task.deleteOne())._id;
  }
}
