import { createBrowserRouter } from "react-router";
import BasicLayout from './../layouts/BasicLayout';
import HomePage from "../pages/HomePage";
import AuthLayout from './../layouts/AuthLayout';
import RegistrationPage from './../pages/RegistrationPage';
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: BasicLayout,
    children: [
      {
        index: true,
        element: <div>
          <HomePage />
        </div>
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
        {
            path: "register",
            Component: RegistrationPage
        },
        {
            path: "login",
            Component: LoginPage
        }
    ]
  },
  {
    path: "/dashboard",
    Component: DashboardLayout
  }
]);