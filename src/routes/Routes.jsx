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
import ApprovedSubmissions from "../components/dashboard/workers/ApprovedSubmissions";
import TaskList from "../components/TaskList";
import TaskDetails from "../components/TaskDetails";
import MySubmission from "../components/MySubmission";
import Withdrawals from "../components/Withdrawals";
import AdminState from "../components/admin/AdminState";
import WithdrawRequest from "../components/admin/WithdrawRequest";
import ManageUsers from "../components/admin/ManageUsers";
import ManageTasks from "../components/admin/ManageTasks";
import SimpleModal from "../elements/SimpleModal";
import SubmissionReview from "../components/dashboard/buyers/SubmissionReview";

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
      },
      {
        path: "approved-submissions",
        element: <div>
          <ApprovedSubmissions />
        </div>
      },
      {
        path: "tasks",
        element: <div>
          <TaskList />
        </div>
      },
      {
        path: "tasks/task-details/:taskId",
        element: <div>
          <TaskDetails />
        </div>
      },
      {
        path: "submissions",
        element: <div>
          <MySubmission />
        </div>
      },
      {
        path: "submissions-review",
        element: <div>
          <SubmissionReview />
        </div>
      },
      {
        path: "admin",
        element: <div>
          <AdminState />
        </div>
      },
      {
    path: "withdrawals",
    element: <div>
      <Withdrawals />
    </div>
  },
  {
    path: "withdraw-request",
    element: <div>
      <WithdrawRequest />
    </div>
  },
  {
    path: "manage-users",
    element: <div>
     <ManageUsers />
    </div>
  },
  {
    path: "manage-tasks",
    element: <div>
      <ManageTasks />
      </div>
  }

     
    ]
  },
  {
    path: "/purchase-coins",
    element: <PurchaseCoins />
  },
  {
    path: "/test",
    element: <SimpleModal />
  }
  
]);