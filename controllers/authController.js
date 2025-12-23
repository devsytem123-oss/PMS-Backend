import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpModel from "../Models/optModel.js";
import sendEmail from "../config/email.js";
import { Profile } from "../Models/profileModel.js";

//register the user

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        password: newUser.password,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something is missing", error: error.message });
    console.log(error.message);
  }
};

// login

export const login = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "user is not registered" });
    }
    const verifyPassword = await bcrypt.compare(password, findUser.password);
    if (!verifyPassword) {
      return res.status(404).json({ message: "something went wrong" });
    }
    const token = jwt.sign(
      { id: findUser._id, role: findUser.role },
      process.env.JWT_SECRET,
      {expiresIn: rememberMe ? "7d" : "1d", }
    );
    console.log('tok',token);
    
    res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
  });
    res.status(200).json({ role:findUser.role, token: token });
    // res.status(200).json({ message: "login  successfully"});
  } catch (error) {
    res.status(500).json({ message: "login failed", error: error.message });
    console.log(error.message);
  }
};



//AutoLogin
export const autoLogin=async(req,res)=>{
const token=req.cookies.token
// res.json(token)
// console.log('t',token);
if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }
  jwt.verify(token,process.env.JWT_SECRET ,(err,decoded)=>{
    if(err){
       return res.status(401).json({ isAuthenticated: false });
    }
    
     res.json({
      isAuthenticated: true,
      userId: decoded.id,
      role:decoded.role,
      token:token

    });
  })

}




//logout

export const logout=(req,res)=>{
      res.clearCookie("token", {
    httpOnly: true,
    secure: false,   
    sameSite: "lax"
  });

  return res.status(200).json({ message: "Logged out successfully" });
}



//forget Password

export const forgetPass=async(req,res)=>{
  const {email}=req.body
  try {
    const user= await User.findOne({email})
    if(!user){
      return res.status(404).json({message:'user does not exist'})
    }

    const otp=Math.floor(1000+Math.random()*7565)
    console.log(`otp is ${otp}`);
    const newotp=new otpModel({
      email,
      otp
    })
       await newotp.save()
      const message=`Your verification code for password reset is ${otp}`;
      await sendEmail(email,'Reset Password',message)

    res.status(200).json({message:'otp sent to your email'})
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export const verifyOtp=async(req,res)=>{
      const {otp}= req.body
      try {
        const otpRecord= await otpModel.findOne({otp});
        if(!otpRecord || Date.now()>otpRecord.createdAt.getTime()+ 60*60*100){
            return res.status(400).json({message:'otp is expired or invalid'})
        }

        res.status(200).json({message:'otp verification successful'})
      } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
      message: "Something went wrong verifying otp",
      error: error.message,
    });
      }
}

export const resetPassword=async(req,res)=>{
    const {email,newPassword}=req.body
    try {
      //  const otpRecord= await otpModel.findOne({email,otp});
      //   if(!otpRecord || Date.now()>otpRecord.createdAt.getTime()+ 60*60*100){
      //        res.status(400).json({message:'otp is expired or invalid'})
      //   }
        const user= await User.findOne({email})
        if(!user){
          res.status(404).json({message:'user does not exist'})

        }
        const newHashedPassword=await bcrypt.hash(newPassword,10)
        user.password=newHashedPassword
        await user.save()
        await otpModel.deleteMany({email})
        res.status(200).json({message:'password changed successfully'})
    } catch (error) {
      console.error("Login Error:", error);
       res.status(500).json({
      message: "password did not reset",
      error: error.message,
    });
    }
}

export const getRole=async(req,res)=>{
   try {
      const role = req.user.role;  
      res.status(200).json(role);
  
    } catch (error) {
      res.status(500).json({
        message: "Error while fetching profile",
        error: error.message,
      });
    }
  
}