import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";

// Create the router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
