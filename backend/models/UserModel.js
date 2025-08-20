import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [20, "Username cannot exceed 20 characters"],
  },
  totalPoints: {
    type: Number,
    default: 0,
    min: [0, "Total points cannot be negative"],
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Total points must be a non-negative number",
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
