import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  Firstname: string;

  @Prop()
  Lastname: string;

  @Prop()
  Email: string;

  @Prop()
  Password: string;

  @Prop()
  Avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
