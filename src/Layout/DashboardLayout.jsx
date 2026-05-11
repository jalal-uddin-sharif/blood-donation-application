import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#fff8fb]">
      <Sidebar />
      <main className="min-h-screen px-4 py-5 sm:px-6 lg:ml-80 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
