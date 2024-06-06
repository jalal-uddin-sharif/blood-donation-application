import React from 'react';
import { MdSpaceDashboard } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const Navitems = ({address, title}) => {
    return (
        <NavLink
            to={address}
            end
            className={({ isActive }) =>
              `hover:bg-gray-600 px-2 py-1 rounded-md hover:text-white ${
                isActive ? "bg-black text-white rounded-md px-2 py-1" : ""
              } `
            }
          >
            <div className="flex">
              <MdSpaceDashboard size={23} className="mr-3 mt-0.5" />{" "}
              <span className="text-lg font-medium">{title}</span>
            </div>
          </NavLink>
    );
};

export default Navitems;