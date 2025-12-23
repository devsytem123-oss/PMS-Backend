import { createMileStone, deleteMile, getAllMilestone, getMilestone } from "../controllers/milestoneController.js";
import veriFyToken from "../middlewares/authMiddleware.js";
import Permit from "../middlewares/roleMiddleware.js";
import express from 'express'

const mileRouter=express.Router()
mileRouter.post('/milestone',veriFyToken,Permit("Project Manager"),createMileStone)
mileRouter.get('/milestone',veriFyToken,getAllMilestone)
mileRouter.get('/milestone/:id',veriFyToken,getMilestone)
mileRouter.delete('/milestone/:id',veriFyToken,Permit("Project Manager"),deleteMile)
export default mileRouter
                                                                                             