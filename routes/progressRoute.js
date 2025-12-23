import express from 'express'
import veriFyToken from '../middlewares/authMiddleware.js'
import Permit from '../middlewares/roleMiddleware.js'
import { ProjectProgress } from '../controllers/progressController.js'
const progressRouter=express.Router()
progressRouter.get('/progress/:projectId',veriFyToken,Permit("Admin", "Client"),ProjectProgress)
export default progressRouter