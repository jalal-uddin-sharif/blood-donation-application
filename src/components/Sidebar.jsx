import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../CustomHooks/useAuth";
import Navitems from "./Navitems";
import { MdOutlineBloodtype, MdOutlineSpaceDashboard } from "react-icons/md";
import useDbUser from "../CustomHooks/useDbUser";
import { BiDonateHeart } from "react-icons/bi";
import { IoMdCreate } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import TextLogo from "./TextLogo";




const Sidebar = () => {
  const {logOut } = useAuth();
  const [User] = useDbUser();
  const Role = User?.Role
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navsFooter = [
    {
      href: "",
      name: "Help",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      ),
    },
    {
      href: "",
      name: "Settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      href: "",
      name: "Logout",
      function: logOut,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      ),
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div className="flex items-center justify-between border-b border-pink-100 bg-white p-4 sm:hidden">
        <Link to={"/"}>
          <TextLogo />
        </Link>
        <button
          className="text-pink-600 focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 7.5h16.5m-16.5 7.5h16.5"
            />
          </svg>
        </button>
      </div>
      <nav
        className={`fixed top-0 left-0 w-full h-full border-r border-pink-100 bg-white/95 space-y-8 transform shadow-xl shadow-pink-100/60 backdrop-blur ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out sm:translate-x-0 sm:w-80 z-50`}
      >
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center px-8">
            <Link to={"/"} className="flex-none">
              <TextLogo />
            </Link>
          </div>
          <div className="flex-1 flex flex-col h-full overflow-auto">
            <ul className="px-4 text-sm font-medium flex-1">
              <Navitems onClick={toggleSidebar}  address={"/dashboard"} label={"Dashboard"} icon={<MdOutlineSpaceDashboard size={20} />} />
              <Navitems  onClick={toggleSidebar}
                address={"/dashboard/my-donation-requests"}
                label={"My donation request"} icon={<BiDonateHeart size={20} />}
              />
              <Navitems onClick={toggleSidebar}
                address={"/dashboard/create-donation-requests"}
                label={"Create donation request"}  icon={<IoMdCreate size={20} />}
              />

              {/* admin only */}
              {Role === "Admin" && (
                <Navitems onClick={toggleSidebar} address={"/dashboard/all-blood-donation-request"} label={"All Blood donation request"} icon={<MdOutlineBloodtype size={20} />} />
              )}

              {Role === "Admin" && (
                <Navitems onClick={toggleSidebar} address={"/dashboard/all-users"} label={"All user"} icon={<FaUsers size={20} />} />
              )}
              {Role === "Admin" && (
                <Navitems onClick={toggleSidebar} address={"/dashboard/content-management"} label={"Content management"} icon={<FaUsers size={20} />} />
              )}
              {Role === "Volunteer" && (
                <Navitems onClick={toggleSidebar} address={"/dashboard/content-management"} label={"Content management"} icon={<FaUsers size={20} />} />
              )}
            </ul>
            <div>
              <ul className="px-4 pb-4 text-sm font-medium">
                {navsFooter.map((item, idx) => (
                  <li key={idx}>
                    <a onClick={item?.function}
                    
                      className="flex cursor-pointer items-center gap-x-2 rounded-lg p-2 text-slate-600 duration-150 hover:bg-pink-50 hover:text-pink-700 active:bg-pink-100"
                    >
                      <div className="text-pink-500">{item.icon}</div>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="border-t border-pink-100 px-4 py-4">
                <div className="flex items-center gap-x-4">
                  <img
                    src={User?.imageUrl}
                    className="h-12 w-12 rounded-full border-2 border-pink-100 object-cover"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-slate-800">
                      {User?.Name}
                    </span>
                    <Link onClick={toggleSidebar}
                    to={"/dashboard/my-profile"}
                      className="mt-px block text-xs text-slate-500 hover:text-pink-600"
                    >
                      View profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
