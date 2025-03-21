import { createBrowserRouter } from "react-router-dom";
import MainPageRoot from "../root/MainPageRoot";
import Home from "../MainPage/Home/Home";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/Registration";
import UserProfile from "../Dashboard/UserProfile";
import DashboardPageRoot from "../root/DashboardPageRoot";
import TeachersSubmissions from "../Dashboard/Admin/TeachersSubmission";
import AdminRoute from "./adminRoute";
import ApplicatorsDetails from "../Dashboard/Admin/ApplicatorsDetails";
import PrivateRoute from "./PrivateRoute";
import Notifications from "../Dashboard/Notifications";
import TeacherRequirementsForm from "../MainPage/Find Tutor/TeacherRequirements";
import TeacherApplicationForm from "../MainPage/Home/Tutor Application/TeacherApplication";
import UserRoute from "./UserRoute";
import TeacherRoute from "./TeacherRoute";
import AvailableTuition from "../MainPage/Available Tuition/AvailableTuition";
import AppliedTuitions from "../Dashboard/Teacher/AppliedTuitions";

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
        path: "/Requirements-Forum",
        element: (
          // <UserRoute>
          <TeacherRequirementsForm />
          // </UserRoute>
        ),
      },
      {
        path: "/Teacher-Application",
        element: (
          <UserRoute>
            <TeacherApplicationForm />
          </UserRoute>
        ),
      },
      {
        path: "/Available-Tuitions",
        element: <AvailableTuition />,
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
            <TeachersSubmissions />
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
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/Applied-Tuitions",
        element: (
          <TeacherRoute>
            <AppliedTuitions />
          </TeacherRoute>
        ),
      },
    ],
  },
]);

export default router;
