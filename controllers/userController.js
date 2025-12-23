import User from "../Models/userModel.js";


export const getUsers=async(req,res)=>{
    try {
        const findUser=await User.find().populate('profile')
        if(!findUser){
            return res.status(401).json({message:'user not found'})
        }
        res.status(200).json(findUser)
    } catch (error) {
        res.status(500).json({message:'user did not found',error:error.message})
    }
}






// ✅ GET USER BY ID
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id; // <-- Use params

        const user = await User.findById(userId).populate("profile");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};



// ✅ UPDATE USER
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            { new: true } // return updated object
        ).populate("profile");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};



// ✅ DELETE USER
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted successfully",
            user: deletedUser
        });

    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};
