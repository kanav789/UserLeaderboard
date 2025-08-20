import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Rank Leaderboard Backend is running!");
});

// all Routes
import userRoutes from "./routes/userRoutes.js";
import claimRoutes from "./routes/claimroutes.js";
app.use("/api/user", userRoutes);
app.use("/api/user", claimRoutes);

export default app;
