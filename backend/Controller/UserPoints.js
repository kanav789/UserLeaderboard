import User from "../models/UserModel.js";
import History from "../models/HistorModel.js";

export const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    // Find the user
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate random points from 1 to 10
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    // Create claim history record
    const claimHistory = new History({
      userId: userId,
      claimPoints: randomPoints,
      claimDate: new Date(),
      status: "claimed",
    });

    await claimHistory.save();

    // Update user's total points
    existingUser.totalPoints += randomPoints;

    // Update highest score if this is higher
    if (randomPoints > existingUser.highestScore) {
      existingUser.highestScore = randomPoints;
    }

    await existingUser.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: `Successfully claimed ${randomPoints} points!`,
      data: {
        claimedPoints: randomPoints,
        newTotalPoints: existingUser.totalPoints,
        claimperson: claimHistory.username,
      },
    });
  } catch (error) {
    console.error("Error claiming points:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user's claim history
// export const getUserClaimHistory = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const limit = parseInt(req.query.limit) || 20;

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: "UserId is required",
//       });
//     }

//     // Check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Get claim history
//     const claimHistory = await History.find({ userId })
//       .sort({ claimDate: -1 })
//       .limit(limit)
//       .lean();

//     // Get total claims summary
//     const totalClaims = claimHistory.reduce(
//       (sum, claim) => sum + claim.claimPoints,
//       0
//     );

//     res.status(200).json({
//       success: true,
//       message: "Claim history fetched successfully",
//       data: {
//         userId: userId,
//         username: user.username,
//         totalPoints: user.totalPoints,
//         totalClaimed: totalClaims,
//         claimHistory: claimHistory,
//         totalClaims: claimHistory.length,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching claim history:", error);

//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Something went wrong",
//     });
//   }
// };
