import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import LeaderBoard from "./Pages/LeaderBoard";

// Create the router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/leaderboard",
    element: <LeaderBoard />,
  },
]);
