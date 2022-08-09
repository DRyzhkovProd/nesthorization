import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface IUser {
  _id?: string;
  name: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
export enum UserRole {
  User = 'User',
  Editor = 'Editor',
  Admin = 'Admin',
}

@Schema()
export class UserModel extends Document {
  @Prop()
  displayName?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.User })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
