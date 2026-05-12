import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiLogOut, FiMenu, FiMoon, FiSun, FiUser } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import useAuth from "../CustomHooks/useAuth";
import useDbUser from "../CustomHooks/useDbUser";
import TextLogo from "../components/TextLogo";

const Navbar = () => {
  const { logOut } = useAuth();
  const [User] = useDbUser();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const loggedOutLinks = [
    { to: "/", label: "Home" },
    { to: "/blood-donation-request", label: "Requests" },
    { to: "/search-donors", label: "Find Donors" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const loggedInLinks = [
    ...loggedOutLinks,
    { to: "/blogs", label: "Blogs" },
    { to: "/funding", label: "Funding" },
    { to: "/dashboard", label: "Dashboard" },
  ];
  const links = User ? loggedInLinks : loggedOutLinks;

  const navList = (
    <>
      {links.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 text-sm font-bold transition ${
                isActive
                  ? "bg-pink-50 text-pink-700"
                  : "text-slate-600 hover:bg-rose-50 hover:text-pink-700"
              }`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
      {!User && (
        <li>
          <Link className="rounded-xl px-3 py-2 text-sm font-bold text-slate-600 hover:bg-rose-50 hover:text-pink-700" to="/login">
            Login
          </Link>
        </li>
      )}
    </>
  );

  return (
    <header className="sticky top-3 z-40">
      <div className="navbar glass-nav rounded-2xl px-3">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} type="button" className="btn btn-ghost btn-circle text-pink-700 lg:hidden" aria-label="Open menu">
              <FiMenu size={22} />
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-[1] mt-3 w-64 rounded-2xl border border-rose-100 bg-white p-3 shadow-xl shadow-rose-100">
              {navList}
            </ul>
          </div>
          <Link to="/" aria-label="RedLove home">
            <TextLogo />
          </Link>
        </div>

        <nav className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{navList}</ul>
        </nav>

        <div className="navbar-end gap-2">
          <button
            onClick={() => setDarkMode((value) => !value)}
            className="btn btn-ghost btn-circle text-pink-700 dark:text-pink-300"
            type="button"
            aria-label="Toggle color mode"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          {User ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} type="button" className="flex items-center gap-2 rounded-2xl border border-rose-100 bg-white px-2 py-1.5 shadow-sm transition hover:border-pink-200">
                <img className="h-10 w-10 rounded-xl object-cover" alt={User?.Name || "User"} src={User?.imageUrl} />
                <span className="hidden text-left md:block">
                  <span className="block text-sm font-black text-slate-900">{User?.Name}</span>
                  <span className="block text-xs font-semibold text-pink-600">{User?.Role}</span>
                </span>
              </button>
              <ul tabIndex={0} className="menu dropdown-content z-[1] mt-3 w-60 rounded-2xl border border-rose-100 bg-white p-3 shadow-xl shadow-rose-100">
                <li>
                  <Link to="/dashboard">
                    <MdOutlineDashboard size={18} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/my-profile">
                    <FiUser size={18} />
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={logOut} type="button">
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/register" className="action-button hidden sm:inline-flex">
              Join as donor
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
