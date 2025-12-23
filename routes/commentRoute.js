import express from 'express'
import veriFyToken from '../middlewares/authMiddleware.js'
import Permit from '../middlewares/roleMiddleware.js'
import { addComment, deleteComment, getComments, updateTaskStatus } from '../controllers/commentController.js'
const commentRouter=express.Router()

commentRouter.patch('/task/status',veriFyToken,Permit("Employee"),updateTaskStatus)
commentRouter.post('/comment',veriFyToken,addComment)
commentRouter.get('/comment/:id',veriFyToken,getComments)
commentRouter.delete('/comment/:id',veriFyToken,deleteComment)
export default commentRouter