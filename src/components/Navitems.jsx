import React from 'react';
import { NavLink } from 'react-router-dom';

const Navitems = ({address, label, icon , onClick}) => {
    return (
        <li>
        <NavLink onClick={onClick}
          to={address}
          end
          className={  ({ isActive }) =>
            `flex items-center gap-x-2 rounded-lg p-2 duration-150 hover:bg-pink-50 hover:text-pink-700 ${isActive ? "bg-pink-50 text-pink-700" : "text-slate-600"}`
          }
        >
        {icon}  {label}
        </NavLink>
      </li>
      
    );
};

export default Navitems;
