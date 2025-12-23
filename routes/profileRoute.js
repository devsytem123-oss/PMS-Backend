import express from "express";
import { createProfile, deleteProfile, getProfile, getProfileById, updateProfile } from "../controllers/profileController.js";
import veriFyToken from "../middlewares/authMiddleware.js";
import Permit from '../middlewares/roleMiddleware.js'
const profileRoute = express.Router();

profileRoute.post("/profile", veriFyToken, createProfile);
profileRoute.get('/profile/:id',veriFyToken,getProfileById)
profileRoute.get('/profile',veriFyToken,getProfile)
profileRoute.put('/profile',veriFyToken,updateProfile)
profileRoute.delete('/profile',veriFyToken,deleteProfile)

export default profileRoute;
