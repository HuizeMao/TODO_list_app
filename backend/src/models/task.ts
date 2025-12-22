import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

import type { InferSchemaType } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  isChecked: { type: Boolean, default: false },
  dateCreated: { type: Date, required: true },
  assignee: { type: ObjectId, required: false, ref: "User" },
});

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>("Task", taskSchema);
