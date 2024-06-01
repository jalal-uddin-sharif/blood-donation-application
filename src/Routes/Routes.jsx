import { createBrowserRouter } from "react-router-dom";
import Roots from "../Roots/Roots";
import Register from "../Authentication/Register";
import DistrictUpazila from "../components/DistrictUpazila";
import Login from "../Authentication/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    children: [
      {
        path: "/",
        element: <div>hello</div>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      
    ],
  },
]);
