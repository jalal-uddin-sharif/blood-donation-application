import React from "react";
import Sidebar from "../components/Sidebar";
import WelcomeSection from "../components/WelcomeSection";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  return (
    <div>
      <div className="relative md:flex">
        {/* Sidebar */}
        <div>
            <Sidebar/>
        </div>

        {/* Dynamic outlet */}
        <div className="flex-1  mr-8 px-10 py-10">
          <Outlet/>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default DashboardLayout;
