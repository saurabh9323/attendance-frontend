import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
import Home from "../components/Home.jsx";
import Login from "../components/Login.jsx";
import AttendanceReport from "../components/AttendanceReport.jsx";

import AdminReport from "../components/AdminReport.jsx";
import Register from "../components/Register.jsx";

import ProtectedRoute from "../utils/ProtectedRoute.jsx";
import AttendanceRecords from "../components/AttendanceRexord.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/home", element: <ProtectedRoute element={<Home />} /> },
      {
        path: "/attendance-report",
        element: <ProtectedRoute element={<AttendanceReport />} />,
      },
      {
        path: "/attendance-record/:username",
        element: <ProtectedRoute element={<AttendanceRecords />} />,
      },

      {
        path: "/admin-report",
        element: <ProtectedRoute element={<AdminReport />} />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
    // Optionally, you can specify an error page for this route group:
    errorElement: <ErrorPage />,
  },
];

const AppProvider = createBrowserRouter(routes);

export default AppProvider;
