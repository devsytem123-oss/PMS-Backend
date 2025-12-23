import Milestone from "../Models/MilestoneModel.js";
import Project from "../Models/projectModel.js";
export const createMileStone = async (req, res) => {
  try {
    const { name, description, projectId, dueDate, status } = req.body;

    const project = await Project.findById(projectId);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });

    if (project.assignedTo.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not assigned as Project Manager for this project",
      });
    }

    const newMilestone = await new Milestone({
      name,
      description,
      projectId,
      dueDate,
      status,
    });
    await newMilestone.save();
    project.milestones.push(newMilestone._id);
    await project.save();
    res.status(201).json({ message: "milestone is created successfully" });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong while milestone creation",
      error: error.message,
    });
  }
};

//get all milestone

export const getAllMilestone = async (req, res) => {
  try {
    const milestones = await Milestone.find().populate(
      "projectId",
      "name assignedTo"
    );

    if (!milestones)
      return res
        .status(404)
        .json({ success: false, message: "Milestone not found" });

    res.status(200).send(milestones);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching milestone",
      error: error.message,
    });
  }
};

//get milestone
export const getMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id).populate(
      "projectId",
      "name assignedTo"
    ).populate("tasks");

    if (!milestone)
      return res
        .status(404)
        .json({ success: false, message: "Milestone not found" });

    res.status(200).send(milestone)
  } catch (error) {
    res.status(500).json({
      message: "Error fetching milestone",
      error: error.message,
    });
  }
};

export const deleteMile = async (req, res) => {
  try {
    const id = req.params.id;

    const milestone = await Milestone.findById(id);
    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: "Milestone not found",
      });
    }

    await Project.findByIdAndUpdate(milestone.projectId, {
      $pull: { milestones: milestone._id },
    });

    await Milestone.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Milestone deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting milestone",
      error: error.message,
    });
  }
};


export const getMileByProjectId=async()=>{
  
}