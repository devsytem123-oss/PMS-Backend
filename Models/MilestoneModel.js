import mongoose from "mongoose";

const milstoneSchema = mongoose.Schema(
  {
    name: { type: String, required: true },

    description: String,
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },
    dueDate: Date,
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    tasks:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"task"
    }]
  },
  { timestamps: true }
);

const Milestone = mongoose.model("milestone", milstoneSchema);
export default Milestone;
