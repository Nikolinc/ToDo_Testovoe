import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Project } from 'src/modules/projects/schemas/project.schema';

export type TaskDocument = HydratedDocument<Task>;

enum Priority {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  CreateDate: Date;

  @Prop()
  timeAtWork: string;

  @Prop()
  expirationDate: Date;

  @Prop()
  Priority: Priority;

  @Prop()
  File: string;

  @Prop()
  CurrentStatus: string;

  @Prop()
  Coments: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: Project;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
