
import { Link } from "react-router-dom";
import useAuth from "../CustomHooks/useAuth";

const Navbar = () => {
  const {logOut} = useAuth()
  const navlist = (
    <>
      <li>
        <a>Home</a>
      </li>
      <li>
        <Link to={'/register'}>Register</Link>
      </li>
      <li>
        <Link to={'/login'}>Login</Link>
      </li>
      <li>
        <button onClick={logOut}>Logout</button>
      </li>
      <li>
        <Link to={'/dashboard'}>Dashboard</Link>
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
        <img className="h-24 w-auto" src="/blood-logo.png" alt="" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlist}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
