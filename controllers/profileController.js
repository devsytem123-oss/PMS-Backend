import { Profile } from "../Models/profileModel.js";
import User from "../Models/userModel.js";

export const createProfile = async (req, res) => {
  const { phone, address, skills } = req.body;
  const id=req.user.id
  console.log('id',id);
  
  //create profile

  try {
    const profileData = await Profile.findById(id);
    if (profileData) {
      return res.status(400).json({ message: "Profile already exist" });
    }

    const addProfile = await Profile.create({
      userId: id,
      phone,
      address,
      skills,
    });

    await User.findByIdAndUpdate(id,{profile:addProfile})
    res.status(201).json({ message: "Profile is created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error while creating profile", error: error.message });
  }
};


//read profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;  

    const profile = await Profile.findOne({ userId })
      .populate("userId");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);

  } catch (error) {
    res.status(500).json({
      message: "Error while fetching profile",
      error: error.message,
    });
  }
};


export const getProfileById=async(req,res)=>{
   try {
    const userId = req.params.id;  

    const profile = await Profile.findOne({ userId })
      .populate("userId");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);

  } catch (error) {
    res.status(500).json({
      message: "Error while fetching profile",
      error: error.message,
    });
  }
}

//update profile
export const updateProfile = async (req, res) => {
  try {
     const id=req.user.id; 
    const { phone, address, skills } = req.body;

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: id },
      { phone, address, skills },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error while updating profile",
      error: error.message,
    });
  }
};


//delete 
export const deleteProfile = async (req, res) => {
  try {
    // const { id } = req.params; 
    const id=req.user.id

    const deletedProfile = await Profile.findOneAndDelete({ userId: id });

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Remove profile reference from User
    await User.findByIdAndUpdate(id, { profile: null });

    return res.status(200).json({
      message: "Profile deleted successfully",
      deletedProfile,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error while deleting profile",
      error: error.message,
    });
  }
};
