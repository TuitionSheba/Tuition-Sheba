import { createBrowserRouter } from "react-router-dom";
import MainPageRoot from "../root/MainPageRoot";
import Home from "../MainPage/Home/Home";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/Registration";
import UserProfile from "../Dashboard/UserProfile";
import DashboardPageRoot from "../root/DashboardPageRoot";
import TeachersSubmission from "../Dashboard/Admin/TeachersSubmission";
import AdminRoute from "./adminRoute";
import TeacherApplicationForm from "../MainPage/Teacher Application/TeacherApplication";
// import UserRoute from "./UserRoute";
import ApplicatorsDetails from "../Dashboard/Admin/ApplicatorsDetails";
import TeachersDetails from "../MainPage/Home/Available Tuitions/Tuition data/TeachersDetails";
import PrivateRoute from "./PrivateRoute";
import Notifications from "../Dashboard/Notifications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPageRoot />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/Sign-Up",
        element: <SignUp />,
      },
      {
        path: "/Teachers-Application",
        element: (
          // <UserRoute>
          <TeacherApplicationForm />
          // </UserRoute>
        ),
      },
      {
        path: "/Teachers-details/:id",
        element: (
          <PrivateRoute>
            <TeachersDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardPageRoot />,
    children: [
      {
        path: "/dashboard/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/Teachers-Submission",
        element: (
          <AdminRoute>
            <TeachersSubmission />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/Teachers-Submission/:id",
        element: (
          <AdminRoute>
            <ApplicatorsDetails />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/notifications",
        element: (
          <AdminRoute>
            <Notifications />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
