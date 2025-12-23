import express from "express";
import { autoLogin, forgetPass, getRole, login, logout, register,  resetPassword, verifyOtp } from "../controllers/authController.js";
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/userController.js";
import veriFyToken from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/autoLogin',autoLogin)
router.get('/user',veriFyToken,getUsers)
router.get('/user/:id',veriFyToken,getUserById)
router.put('/user/:id',veriFyToken,updateUser)
router.delete('/user/:id',veriFyToken,deleteUser)
router.post('/logout',logout)
router.post('/forgotPassword',forgetPass)
router.post('/verifyOtp',verifyOtp)
router.post('/resetPassword',resetPassword)
router.get('/getRole',veriFyToken,getRole)

export default router;
