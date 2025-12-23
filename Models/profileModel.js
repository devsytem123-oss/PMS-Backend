import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "user",
  },
  phone: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
});

export const Profile = mongoose.model("profile", profileSchema);
