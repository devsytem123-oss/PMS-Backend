import mongoose, { Schema } from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    milestones:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'milestone'
    }],
    status: {
      type: String,
      required: true,
      enum: ["Not Started", "In Progress", "Completed", "On Hold"],
      default: "Not Started",
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("project", projectSchema);

export default Project;
