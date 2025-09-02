import { createBrowserRouter } from "react-router";
import Root from "./root";
import Home from "../Page/Home/Home";
import Login from "../Page/Authentication/Login";
import Register from "../Page/Authentication/Register";
import Error from "../Page/Cpmponents/Error";
import ServicesAdd from "../Page/Cpmponents/Product/ServiceAdd";
import DashboardLayout from "../Page/Dashbord/DashbordLayout";
import MainDashbord from "../Page/Dashbord/MainDashbord";
import PrivateRouter from "../Page/Authentication/PrivateRoute";


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
        element: <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
        children: [
          {
            index: true,
            element: <PrivateRouter>
              <MainDashbord></MainDashbord>
            </PrivateRouter>
          },
          {
            path: 'add-services',
            element: <PrivateRouter>
              <ServicesAdd></ServicesAdd>
            </PrivateRouter>
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