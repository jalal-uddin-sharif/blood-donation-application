import { useState } from "react";
import { Link } from "react-router-dom";
import { FiFileText, FiLogOut, FiMenu, FiSettings, FiUser, FiX } from "react-icons/fi";
import { MdOutlineBloodtype, MdOutlineSpaceDashboard } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { IoMdCreate } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import useAuth from "../CustomHooks/useAuth";
import useDbUser from "../CustomHooks/useDbUser";
import Navitems from "./Navitems";
import TextLogo from "./TextLogo";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [User] = useDbUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const role = User?.Role;

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((value) => !value);

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <MdOutlineSpaceDashboard size={20} /> },
    { to: "/dashboard/my-profile", label: "My profile", icon: <FiUser size={20} /> },
    { to: "/dashboard/my-donation-requests", label: "My requests", icon: <BiDonateHeart size={20} /> },
    { to: "/dashboard/create-donation-requests", label: "Create request", icon: <IoMdCreate size={20} /> },
  ];

  const adminItems = [
    { to: "/dashboard/all-blood-donation-request", label: "All requests", icon: <MdOutlineBloodtype size={20} /> },
    { to: "/dashboard/all-users", label: "Users", icon: <FaUsers size={20} /> },
    { to: "/dashboard/content-management", label: "Content", icon: <FiFileText size={20} /> },
  ];

  const volunteerItems = [
    { to: "/dashboard/content-management", label: "Content", icon: <FiFileText size={20} /> },
  ];

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-rose-100 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/">
          <TextLogo />
        </Link>
        <button className="btn btn-ghost btn-circle text-pink-700" onClick={toggleSidebar} type="button" aria-label="Toggle dashboard menu">
          {isSidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 border-r border-rose-100 bg-white shadow-2xl shadow-rose-100/80 transition-transform duration-200 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b border-rose-100 px-6">
            <Link to="/" onClick={closeSidebar}>
              <TextLogo />
            </Link>
            <button className="btn btn-ghost btn-circle text-pink-700 lg:hidden" onClick={closeSidebar} type="button" aria-label="Close menu">
              <FiX size={22} />
            </button>
          </div>

          <div className="p-4">
            <div className="rounded-3xl bg-gradient-to-br from-pink-600 to-rose-500 p-4 text-white shadow-lg shadow-pink-100">
              <div className="flex items-center gap-3">
                <img src={User?.imageUrl} alt={User?.Name || "User"} className="h-14 w-14 rounded-2xl border border-white/50 object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-black">{User?.Name}</p>
                  <p className="truncate text-xs font-semibold text-pink-100">{User?.Email}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/15 px-3 py-2 text-xs font-black">
                <span>{role || "Member"}</span>
                <span className="capitalize">{User?.status || "active"}</span>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 pb-4">
            <p className="px-3 pb-2 text-xs font-black uppercase text-slate-400">Main</p>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <Navitems key={item.to} onClick={closeSidebar} address={item.to} label={item.label} icon={item.icon} />
              ))}
            </ul>

            {role === "Admin" && (
              <>
                <p className="px-3 pb-2 pt-6 text-xs font-black uppercase text-slate-400">Admin</p>
                <ul className="space-y-1">
                  {adminItems.map((item) => (
                    <Navitems key={item.to} onClick={closeSidebar} address={item.to} label={item.label} icon={item.icon} />
                  ))}
                </ul>
              </>
            )}

            {role === "Volunteer" && (
              <>
                <p className="px-3 pb-2 pt-6 text-xs font-black uppercase text-slate-400">Volunteer</p>
                <ul className="space-y-1">
                  {volunteerItems.map((item) => (
                    <Navitems key={item.to} onClick={closeSidebar} address={item.to} label={item.label} icon={item.icon} />
                  ))}
                </ul>
              </>
            )}
          </nav>

          <div className="border-t border-rose-100 p-4">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-rose-50 hover:text-pink-700" type="button">
              <FiSettings size={20} />
              Settings
            </button>
            <button onClick={logOut} className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-rose-50 hover:text-pink-700" type="button">
              <FiLogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {isSidebarOpen && <button className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={closeSidebar} type="button" aria-label="Close menu overlay" />}
    </>
  );
};

export default Sidebar;
