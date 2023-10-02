import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type projectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  user: string;

  @Prop()
  image: string;

  @Prop()
  file: string;

  @Prop()
  DueDate: Date;

  @Prop()
  CreateDate: Date;

  @Prop()
  Update: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
