import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "task", required: true },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
    
  },
  { timestamps: true }
);

const Comment = model("comment", commentSchema);
export default Comment
