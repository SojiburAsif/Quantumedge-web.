import { createBrowserRouter } from "react-router";
import Root from "./root";
import Home from "../Page/Home/Home";
import Login from "../Page/Authentication/Login";
import Register from "../Page/Authentication/Register";
import Error from "../Page/Cpmponents/Error";

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
      }
    ]
  },
  {
    path: "*",
    element: <Error />
  }
]);