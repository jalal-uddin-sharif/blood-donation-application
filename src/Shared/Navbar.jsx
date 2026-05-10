import { Link } from "react-router-dom";
import useAuth from "../CustomHooks/useAuth";
import useDbUser from "../CustomHooks/useDbUser";
import TextLogo from "../components/TextLogo";

const Navbar = () => {
  const { logOut} = useAuth();
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
        <Link to={"/blogs"}>Blogs</Link>
      </li>
      <li>
        <Link to={"/funding"}>Funding</Link>
      </li>
      {!User ? 
         <li>
         <Link  to={"/login"}>Login</Link>
       </li> : ""
      
      }
      
    </>
  );
  return (
    <div className="navbar sticky top-0 z-40 my-3 rounded-lg border border-pink-100 bg-white/90 px-3 shadow-sm shadow-pink-100 backdrop-blur">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost text-pink-600 lg:hidden">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] w-52 rounded-lg border border-pink-100 bg-white p-2 shadow-lg shadow-pink-100"
          >
            {navlist}
          </ul>
        </div>
        <Link to={"/"} aria-label="RedLove home">
          <TextLogo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlist}</ul>
      </div>
      <div className="navbar-end">
        {
          User && 
          <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-pink-100">
        <div className="w-10 rounded-full">
          <img alt="" src={User?.imageUrl} />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] w-52 rounded-lg border border-pink-100 bg-white p-2 shadow-lg shadow-pink-100">
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
