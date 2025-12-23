import Project from "../Models/projectModel.js";
import Milestone from "../Models/MilestoneModel.js";
import Task from "../Models/taskModel.js";
import Comment from "../Models/commentModel.js";

export const ProjectProgress = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate("createdBy").populate(
      "assignedTo",
      "name email"
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const milestones = await Milestone.find({ projectId });

    milestones.forEach((m) => console.log(m.name));

    const milestoneIds = milestones.map((m) => m._id);

    const tasks = await Task.find({
      milestoneId: { $in: milestoneIds },
    }).populate("assignedTo", "name email");

    const taskIds = tasks.map((t) => t._id);

    const comments = await Comment.find({ taskId: { $in: taskIds } })
      .populate("authorId", "name role")
      .populate("taskId", "title");

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "Completed").length;
    const inProgressTasks = tasks.filter(
      (t) => t.status === "In Progress"
    ).length;
    const pendingTasks = tasks.filter((t) => t.status === "Pending").length;

    res.status(200).json({
      success: true,
      projectDetails: project,
      milestones,
      summary: {
        totalTasks,
        completedTasks,
        inProgressTasks,
        pendingTasks,
      },
      tasks,
      comments,
    });
  } catch (error) {
    console.error("Project Progress Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
