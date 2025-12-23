import Task from "../Models/taskModel.js";
import Comment from "../Models/commentModel.js";

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;

    const allowedStatus = ["pending", "in-progress", "completed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    if (req.user.role !== "Employee") {
      return res.status(403).json({
        success: false,
        message: "Only Employees can update task status",
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    console.error("Task Status Update Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { taskId, text } = req.body;

    // if (
    //   !["Employee", "Team Leader", "Project Manager"].includes(req.user.role)
    // ) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "You are not allowed to comment on this task",
    //   });
    // }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const comment = await Comment.create({
      taskId,
      authorId: req.user.id,
      text,
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    console.error("Add Comment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const taskId = req.params.id;
   
    // Validate Task
    const task = await Task.find({taskId});
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Fetch all comments related to this task
    const comments = await Comment.find({ taskId })
      .populate("authorId", "name role") // populate user details
      .sort({ createdAt: -1 }); // latest comment first

    res.status(200).send(comments)
  } catch (error) {
    console.error("Get Comments Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//delete Comment

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params; 

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    
    if (comment.authorId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this comment",
      });
    }

    
    await Comment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Delete Comment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
