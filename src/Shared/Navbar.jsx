import { Link } from "react-router-dom";
import useAuth from "../CustomHooks/useAuth";
import useDbUser from "../CustomHooks/useDbUser";

const Navbar = () => {
  const { logOut } = useAuth();
  const [User] = useDbUser();
  const navlist = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/blood-donation-request"}>Donation Requests</Link>
      </li>
      <li>
        <Link to={"/login"}>Blog</Link>
      </li>
      {!User ? 
         <li>
         <Link  to={"/login"}>Login</Link>
       </li> : ""
      
      }
      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-gray-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navlist}
          </ul>
        </div>
        <img
          className="h-16 w-24"
          src="https://i.ibb.co/hgyKrGR/Red-Love-1.png"
          alt=""
        />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlist}</ul>
      </div>
      <div className="navbar-end">
        {
          User && 
          <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link to={"/dashboard"}>Dashboard</Link></li>
        <li onClick={logOut}><a>Logout</a></li>
      </ul>
    </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
