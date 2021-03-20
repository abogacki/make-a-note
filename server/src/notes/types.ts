import { Document } from "mongoose";

export interface INoteModel extends Document {
  title: string;
  description: string;
  createdAt: Date;
  expiryDate?: Date;
}
