import express from 'express'
import veriFyToken from '../middlewares/authMiddleware.js'
import Permit from '../middlewares/roleMiddleware.js'
import { assignTask, createTask, deleteTask, getAllTasks, getTasks } from '../controllers/taskController.js'

const taskRouter=express.Router()

taskRouter.post('/task',veriFyToken,Permit("Project Manager"),createTask)
taskRouter.put('/task',veriFyToken,Permit("Team Leader"),assignTask)
taskRouter.get('/task/:id',veriFyToken,getTasks)
taskRouter.get('/task',veriFyToken,getAllTasks)
taskRouter.delete('/task/:id',deleteTask)
export default taskRouter