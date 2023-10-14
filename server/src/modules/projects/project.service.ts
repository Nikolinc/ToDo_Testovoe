import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Date, Schema } from 'mongoose';
import { FileService } from 'src/shared/file/file.service';
import { Project } from './schemas/project.schema';
import { CreateProjectDTO } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  uploadImage(id: Schema.Types.ObjectId, arg1: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectModel(Project.name) private ProjectModel: Model<Project>,
    private fileService: FileService,
  ) {}

  async create(projectDTO: CreateProjectDTO): Promise<Project> {
    const createdUser = await this.ProjectModel.create({
      ...projectDTO,
    });
    createdUser.CreateDate = new Date();
    createdUser.Update = new Date();
    createdUser.save();
    return createdUser;
  }

  async upload(req: {
    id: ObjectId;
    params: string;
    value: string | Date | boolean;
  }): Promise<Project[]> {
    const project = await this.ProjectModel.findById(req.id);
    project[req.params] = req.value;
    project.Update = new Date();
    project.save();
    return [project];
  }

  async uploadFile(
    id: ObjectId,
    params: string,
    imageFile,
  ): Promise<Project[]> {
    const project = await this.ProjectModel.findById(id);
    const imagePath = this.fileService.createFile(
      `project/${params}`,
      imageFile,
    );
    project.Update = new Date();
    project[params] = imagePath;
    project.save();
    return [project];
  }

  async findAll(): Promise<Project[]> {
    return this.ProjectModel.find().exec();
  }

  async findById(id: string): Promise<Project[]> {
    const project = await this.ProjectModel.findById(id);
    return [project];
  }

  async delete(id: ObjectId): Promise<any> {
    const project = await this.ProjectModel.findById(id);
    try {
      if (project.image) this.fileService.remoweFile(project.image);
      if (project.file) this.fileService.remoweFile(project.file);
    } catch {}
    return (await project.deleteOne())._id;
  }
}
