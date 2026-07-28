import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import { initializeSampleData } from "./utils/sampleData";

export default function App() {
  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();
  }, []);

  return <RouterProvider router={router} />;
}