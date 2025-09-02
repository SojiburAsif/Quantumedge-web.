import { createBrowserRouter } from "react-router";
import Root from "./root";
import Home from "../Page/Home/Home";
import Login from "../Page/Authentication/Login";
import Register from "../Page/Authentication/Register";
import Error from "../Page/Cpmponents/Error";
import ServicesAdd from "../Page/Cpmponents/Product/ServiceAdd";
import DashboardLayout from "../Page/Dashbord/DashbordLayout";
import MainDashbord from "../Page/Dashbord/MainDashbord";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        path: "/"
      },
      {
        element: <Login></Login>,
        path: "/login"
      },
      {
        path: "/Register",
        element: <Register></Register>
      },

      {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
          {
            index: true,
            element: <MainDashbord></MainDashbord>,
          },
          {
            path: 'add-services',
            element: <ServicesAdd></ServicesAdd>
          },
        ]
      }
    ]
  },
  {
    path: "*",
    element: <Error />
  }
]);