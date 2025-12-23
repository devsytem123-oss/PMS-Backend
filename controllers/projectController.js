import Project from "../Models/projectModel.js";
import User from "../Models/userModel.js";

export const createProject = async (req, res) => {
  const { name, description, assignedTo, startDate, endDate } = req.body;
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only Admin can create a project",
      });
    }
   
    const pm = await User.findById(assignedTo);
    if (!pm) {
      return res.status(404).json({
        success: false,
        message: "Project Manager not found",
      });
    }

   
    if (pm.role !== "Project Manager") {
      return res.status(400).json({
        success: false,
        message: "Assigned user is not a Project Manager",
      });
    }
    const newProject = await Project.create({
      name,
      description,
      createdBy: req.user.id,
      assignedTo: pm._id,
      startDate,
      endDate,
    });

    res.status(201).json({ message: "Project is created", newProject });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error by creating the project", error: error.message });
  }
};


//get all project
export const getAllProjects = async (req, res) => {
  try {
    let projects;

    if (req.user.role === "Admin") {
      projects = await Project.find().populate("assignedTo createdBy");
    } 
    else if (req.user.role === "Project Manager") {
      projects = await Project.find({ assignedTo: req.user.id })
        .populate("assignedTo createdBy");
    } 
    else {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view all projects",
      });
    }

    // res.status(200).json({
    //   success: true,
    //   count: projects.length,
    //   projects,
    // });

    res.status(200).send(projects)

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
    });
  }
};


//get single Project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("assignedTo createdBy").populate("milestones");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // if (
    //   req.user.role !== "Admin" &&
    //   project.assignedTo.toString() !== req.user.id
    // ) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Not authorized to access this project",
    //   });
    // }

    // res.status(200).json({
    //   success: true,
    //   project,
    // });

    res.send(project)

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving project",
      error: error.message,
    });
  }
};


//update
export const updateProject = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only Admin can update a project",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("assignedTo createdBy");

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating project",
      error: error.message,
    });
  }
};

//delete project
export const deleteProject = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only Admin can delete a project",
      });
    }

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting project",
      error: error.message,
    });
  }
};



