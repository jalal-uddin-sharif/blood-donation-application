import React from 'react';
import { NavLink } from 'react-router-dom';

const Navitems = ({address, label, icon , onClick}) => {
    return (
        <li>
        <NavLink onClick={onClick}
          to={address}
          end
          className={  ({ isActive }) =>
            `flex items-center gap-x-3 rounded-xl px-3 py-2.5 text-sm font-bold duration-150 hover:bg-pink-50 hover:text-pink-700 ${isActive ? "bg-pink-600 text-white shadow-lg shadow-pink-100 hover:bg-pink-600 hover:text-white" : "text-slate-600"}`
          }
        >
        <span className="text-lg">{icon}</span>  {label}
        </NavLink>
      </li>
      
    );
};

export default Navitems;
