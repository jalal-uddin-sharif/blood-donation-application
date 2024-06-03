import { MdBloodtype, MdSpaceDashboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div className="relative flex min-h-screen w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
        <div className="p-4 mb-2">
          <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Sidebar
          </h5>
        </div>
        <nav className="flex min-w-[240px]  min-h-screen flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          <NavLink
            to={"/dashboard"}
            end
            className={({ isActive }) =>
              `hover:bg-gray-600 px-2 py-1 rounded-md hover:text-white ${
                isActive ? "bg-black text-white rounded-md px-2 py-1" : ""
              } `
            }
          >
            <div className="flex">
              <MdSpaceDashboard size={23} className="mr-3 mt-0.5" />{" "}
              <span className="text-lg font-medium">Dashboard</span>
            </div>
          </NavLink>
          <NavLink
            to={"/dashboard/my-donation-requests"}
            className={({ isActive }) =>
              `hover:bg-gray-600 px-2 py-1 rounded-md hover:text-white ${
                isActive ? "bg-black text-white rounded-md px-2 py-1" : ""
              } `
            }
          >
            <div className="flex">
              <MdBloodtype size={23} className="mr-3 mt-0.5" />{" "}
              <span className="text-lg font-medium">My Donation </span>
            </div>
          </NavLink>
          <NavLink
            to={"/dashboard/create-donation-requests"}
            className={({ isActive }) =>
              `hover:bg-gray-600 px-2 py-1 rounded-md hover:text-white ${
                isActive ? "bg-black text-white rounded-md px-2 py-1" : ""
              } `
            }
          >
            <div className="flex">
              <MdBloodtype size={23} className="mr-3 mt-0.5" />{" "}
              <span className="text-lg font-medium">Create Donation</span>
            </div>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
