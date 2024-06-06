import React from 'react';
import { NavLink } from 'react-router-dom';

const Navitems = ({address, label, icon}) => {
    return (
        <li>
        <NavLink
          to={address}
          end
          className={  ({ isActive }) =>
            `flex items-center gap-x-2 text-gray-600 p-2 rounded-lg ${isActive ? "text-pink-600" : ""}`
          }
        >
        {icon}  {label}
        </NavLink>
      </li>
      
    );
};

export default Navitems;