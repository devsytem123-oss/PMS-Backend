import mongoose from "mongoose";

const userSchema=mongoose.Schema({
  name:{
    type:String,
    required:true

  },
  email:{
     type:String,
    required:true,
    unique:true,
    lowercase:true
  },
  password:{
     type:String,
    required:true,
  },
  role:{
     type:String,
    required:true,
    enum:['Admin','Project Manager','Team Leader','Employee','Client'],
    
  },
  profile:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'profile'
  }
 
},{
    timestamps:true
})


const User=mongoose.model('user',userSchema)

export default User;