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
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UpdateRequest from "../Dashboard/Pages/UpdateRequest";
import Content from "../Dashboard/Pages/Content";
import CreateBlog from "../Dashboard/Pages/CreateBlog";
import DashboardHome from "../Dashboard/DashboardHome";
import Home from "../Home/Home";
import SearchDonors from "../Home/SearchDonors";
import BloodDonationRequest from "../Home/BloodDonationRequest";
import ViewDetails from "../Home/ViewDetails";
import Blogs from "../Home/Blogs";
import BlogDetails from "../Home/BlogDetails";
import Page404 from "../components/Page404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    errorElement: <Page404/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/search-donors",
        element: <SearchDonors/>,
      },
      {
        path: "/blood-donation-request",
        element: <BloodDonationRequest/>,
      },
      {
        path: "/view-details/:id",
        element: <PrivateRoute>
          <ViewDetails/>
        </PrivateRoute>,
      },
      {
        path: "/blogs",
        element: <Blogs/>,
      },
      {
        path: "/blog-details/:id",
        element: <BlogDetails/>,
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
    element:
     <PrivateRoute> <DashboardLayout/></PrivateRoute>,
  
    children: [
      {
      index: true,
        element: <DashboardHome/>
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
        path: "update-donation-requests/:id",
        element: <UpdateRequest/>
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
      {
        path: "content-management",
        element: <Content/>
      },
      {
        path: "content-management/add-blog",
        element: <CreateBlog/>
      },
    ]
  }
]);
