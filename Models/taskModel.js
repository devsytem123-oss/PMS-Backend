import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    milestoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "milestone",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true }
);

const Task = mongoose.model("task", taskSchema);

export default Task;
