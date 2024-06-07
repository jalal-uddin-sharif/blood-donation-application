import { createBrowserRouter } from "react-router-dom";
import Roots from "../Roots/Roots";
import Register from "../Authentication/Register";
import DistrictUpazila from "../components/DistrictUpazila";
import Login from "../Authentication/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import MyDonationRequests from "../Dashboard/Pages/MyDonationRequests";
import WelcomeSection from "../components/WelcomeSection";
import CreateDonation from "../Dashboard/Pages/CreateDonation";
import AllUser from "../Dashboard/Pages/AllUser";
import Profile from "../Dashboard/Pages/Profile";
import AllBloodDonation from "../Dashboard/Pages/AllBloodDonation";

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
  {
    path: "/dashboard",
    element: <DashboardLayout/>,
    children: [
      {
      index: true,
        element: <WelcomeSection/>
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests/>
      },
      {
        path: "create-donation-requests",
        element: <CreateDonation/>
      },
      {
        path: "all-users",
        element: <AllUser/>
      },
      {
        path: "my-profile",
        element: <Profile/>
      },
      {
        path: "all-blood-donation-request",
        element: <AllBloodDonation/>
      },
    ]
  }
]);
