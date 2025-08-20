import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    const connectionString =
      process.env.MONGODB_URI || "mongodb://localhost:27017/rankleaderboard";

    const conn = await mongoose.connect(connectionString, {});

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
