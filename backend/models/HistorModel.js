import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  claimPoints: {
    type: Number,
    required: [true, "Claim points are required"],
    min: [0, "Claim points cannot be negative"],
  },
  claimDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "claimed",
  },
});

const History = mongoose.model("History", historySchema);

export default History;
