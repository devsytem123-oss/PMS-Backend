import express from 'express'
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/projectController.js'
import Permit from '../middlewares/roleMiddleware.js'
import veriFyToken from '../middlewares/authMiddleware.js'

const projectRoute=express.Router()

projectRoute.post('/project',veriFyToken,Permit("Admin"),createProject)
projectRoute.get('/project',veriFyToken,Permit("Admin","Project Manager"),getAllProjects)
projectRoute.get('/project/:id',veriFyToken,Permit("Admin","Project Manager"),getProjectById)
projectRoute.put('/project/:id',veriFyToken,Permit("Admin"),updateProject)
projectRoute.delete('/project/:id',veriFyToken,Permit("Admin"),deleteProject)

export default projectRoute