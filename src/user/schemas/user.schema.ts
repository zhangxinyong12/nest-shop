import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({
    default: '#000',
  })
  breed: string;

  @Prop({
    required: true,
  })
  sex: string;

  @Prop({
    required: true,
  })
  phone: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
