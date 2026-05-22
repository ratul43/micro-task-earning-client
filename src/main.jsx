import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthProvider";
import UserDataProvider from "./context/UserDataProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserDataProvider>
        <RouterProvider router={router} />
      </UserDataProvider>
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);
