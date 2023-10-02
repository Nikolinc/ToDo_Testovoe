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
    return createdUser.save();
  }

  async upload(req: {
    id: ObjectId;
    params: string;
    value: string | Date;
  }): Promise<Project> {
    const project = await this.ProjectModel.findById(req.id);
    project[req.params] = req.value;
    return project.save();
  }

  async uploadFile(id: ObjectId, params: string, imageFile): Promise<Project> {
    const project = await this.ProjectModel.findById(id);
    const imagePath = this.fileService.createFile(
      `project/${params}`,
      imageFile,
    );

    project[params] = imagePath;
    project.save();
    return project;
  }

  async findAll(): Promise<Project[]> {
    return this.ProjectModel.find().exec();
  }

  async findById(id: string): Promise<Project> {
    return this.ProjectModel.findById(id);
  }

  async delete(id: ObjectId): Promise<any> {
    const project = await this.ProjectModel.findById(id);
    this.fileService.remoweFile(project.image);
    return (await project.deleteOne())._id;
  }
}
