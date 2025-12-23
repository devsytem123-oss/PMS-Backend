import Task from '../Models/taskModel.js'
import Milestone from '../Models/MilestoneModel.js'
import User from '../Models/userModel.js'

export const createTask = async (req, res) => {
  try {

    const { title, description, milestoneId } = req.body;

    const mile = await Milestone.findById(milestoneId);
    if (!mile) return res.status(404).json({ msg: 'Milestone not found' });

    const task = new Task({
      title,
      description,
      milestoneId,
     
    });
    await task.save();
    mile.tasks.push(task._id)
    await mile.save()

    res.status(201).json(task);
  } catch (error) {
    console.error('Create Task error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};


export const assignTask = async (req, res) => {
  try {
    const { taskId, assignedTo } = req.body;

   
    const task = await Task.findById(taskId);
    if (!task)
      return res.status(404).json({ success: false, message: "Task not found" });

    const employee = await User.findById(assignedTo);
    if (!employee)
      return res.status(404).json({ success: false, message: "Employee not found" });

    if (employee.role !== "Employee") {
      return res.status(400).json({
        success: false,
        message: "Assigned user is not an Employee",
      });
    }

    
    task.assignedTo = assignedTo;
    task.assignedBy = req.user.id;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task assigned successfully",
      task,
    });
  } catch (error) {
    console.error("Task Assign Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTasks=async(req,res)=>{

  try {
    let tasks=await Task.find().populate('milestoneId')
    res.send(tasks)
    
  } catch (error) {
    res.send(error.message)
  }
}


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.id)
      .populate('assignedTo', 'profile')
      .populate('assignedBy', 'profile')
      .populate({ path: 'comments', populate: { path: 'authorId', select: 'profile' } })
      .populate('milestoneId'); 
    res.json(tasks);
  } catch (error) {
    console.error('Get Tasks error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const tasks = await Task.findByIdAndDelete(req.params.id)
      
    res.json({message:'task deleted'});
  } catch (error) {
    console.error('Get Tasks error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};