import { MdBloodtype, MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Navitems from "./Navitems";
import useRole from "../CustomHooks/useRole";


const Sidebar = () => {
  const Role = useRole()
  console.log(Role);
  return (
    <div>
      <div className="relative flex min-h-screen w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
        <div className="p-4 mb-2">
          <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Sidebar
          </h5>
        </div>
        <nav className="flex min-w-[240px]  min-h-screen flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          <Navitems address={"/dashboard"} title={"Dashboard"} />

          <Navitems
            address={"/dashboard/my-donation-requests"}
            title={"My Donation"}
          />
          <Navitems
            address={"/dashboard/create-donation-requests"}
            title={"Create Donation"}
          />

          {/* admin only */}
          {
            Role === "Admin" && 
          <Navitems address={"/dashboard/all-users"} title={"All user"} />
          }
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
