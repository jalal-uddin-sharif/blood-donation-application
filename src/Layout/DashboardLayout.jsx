import React from "react";
import Sidebar from "../components/Sidebar";
import WelcomeSection from "../components/WelcomeSection";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-pink-50/40">
      <div className="relative md:flex">
        {/* Sidebar */}
        <div>
            <Sidebar/>
        </div>

        {/* Dynamic outlet */}
        <div className="flex-1 px-4 py-6 sm:px-8 md:ml-[319px] md:px-10 md:py-10">
          <Outlet/>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default DashboardLayout;
