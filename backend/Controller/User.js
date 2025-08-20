import User from "../models/UserModel.js";

export const AddUser = async (req, res) => {
  try {
    const { username } = req.body;

    // Validate username
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username: username.trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Create new user
    const newUser = await User.create({
      username: username.trim(),
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: newUser._id,
        username: newUser.username,
        totalPoints: newUser.totalPoints,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const AllUser = async (req, res) => {
  try {
    // Get query parameters for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalUsers = await User.countDocuments();

    // Fetch users (always sorted by newest first)
    const users = await User.find()
      .sort({ _id: -1 }) // latest users first
      .skip(skip)
      .limit(limit)
      .select("username totalPoints ")
      .lean();

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / limit);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          limit,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user by ID
export const GetUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(id)
      .select(
        "username totalPoints currentScore highestScore gamesPlayed rank level lastGameDate averagePoints"
      )
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get top players (leaderboard)

export const GetTopPlayers = async (req, res) => {
  try {
    // Get query parameters for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalUsers = await User.countDocuments();

    // Fetch users (always sorted by newest first)
    const users = await User.find()
      .sort({ totalPoints: -1 }) // latest users first
      .skip(skip)
      .limit(limit)
      .select("username totalPoints")
      .lean();

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / limit);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          limit,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
