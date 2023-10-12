import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Project } from 'src/modules/projects/schemas/project.schema';

export type TaskDocument = HydratedDocument<Task>;

export enum Priority {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum Status {
  Queue = 'Queue',
  Development = 'Development',
  Done = 'Done',
}

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  createDate: Date;

  @Prop()
  timeAtWork: string;

  @Prop()
  expirationDate: Date;

  @Prop()
  priority: Priority;

  @Prop()
  file: string;

  @Prop()
  currentStatus: Status;

  @Prop()
  coments: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: Project;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
