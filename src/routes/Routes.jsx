import { createBrowserRouter } from "react-router";
import BasicLayout from './../layouts/BasicLayout';
import HomePage from "../pages/HomePage";
import AuthLayout from './../layouts/AuthLayout';
import RegistrationPage from './../pages/RegistrationPage';
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../layouts/DashboardLayout";
import AddTask from "../components/forms/AddTask";
import PurchaseCoins from './../components/PurchaseCoins';
import AddedTasks from "../components/dashboard/buyers/table/AddedTasks";
import WorkerStats from "../components/dashboard/workers/States";

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
    Component: DashboardLayout,
    children: [   
      {
        path: "add-task",
        element: 
          <AddTask />
      },
      {
        path: "added-tasks",
        element: <div>
          <AddedTasks />
        </div>
      },
      {
        path: "states",
        element: <div>
          <WorkerStats>
            
          </WorkerStats>
        </div>
      }
    ]
  },
  {
    path: "/purchase-coins",
    element: <PurchaseCoins />
  }
]);