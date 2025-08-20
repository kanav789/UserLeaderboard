import app from "./app.js";
import connectDb from "./Db/Connection.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 400;

// Connect to MongoDB
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
