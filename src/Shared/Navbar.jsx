import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiChevronDown, FiLogOut, FiMenu, FiMoon, FiSun, FiUser } from "react-icons/fi";
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
  const primaryLinks = User ? links.slice(0, 5) : links.slice(0, 4);
  const moreLinks = User ? links.slice(5) : links.slice(4);

  const navLinkClass = ({ isActive }) =>
    `block rounded-xl px-3 py-2 text-sm font-bold transition ${
      isActive
        ? "bg-pink-600 text-white"
        : "text-slate-600 hover:bg-rose-50 hover:text-pink-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-pink-300"
    }`;

  const mobileNavList = (
    <>
      {links.map((item) => (
        <li key={item.to}>
          <NavLink to={item.to} className={navLinkClass}>
            {item.label}
          </NavLink>
        </li>
      ))}
      {!User && (
        <li>
          <Link className="block rounded-xl px-3 py-2 text-sm font-bold text-slate-600 hover:bg-rose-50 hover:text-pink-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-pink-300" to="/login">
            Login
          </Link>
        </li>
      )}
    </>
  );

  return (
    <header className="sticky top-3 z-40 w-full">
      <div className="navbar glass-nav min-h-16 rounded-2xl px-3">
        <div className="navbar-start min-w-0">
          <div className="dropdown">
            <button tabIndex={0} type="button" className="btn btn-ghost btn-circle text-pink-700 dark:text-pink-300 xl:hidden" aria-label="Open menu">
              <FiMenu size={22} />
            </button>
            <ul tabIndex={0} className="dropdown-content z-50 mt-3 w-64 space-y-1 rounded-2xl border border-rose-100 bg-white p-3 shadow-xl shadow-rose-100 dark:border-slate-700 dark:bg-slate-950">
              {mobileNavList}
            </ul>
          </div>
          <Link to="/" aria-label="RedLove home" className="min-w-0">
            <TextLogo />
          </Link>
        </div>

        <nav className="navbar-center hidden xl:flex">
          <ul className="flex flex-nowrap items-center gap-1 px-1">
            {primaryLinks.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            {moreLinks.length > 0 && (
              <li className="dropdown dropdown-end">
                <button tabIndex={0} type="button" className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-rose-50 hover:text-pink-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-pink-300">
                  More <FiChevronDown size={16} />
                </button>
                <ul tabIndex={0} className="dropdown-content z-50 mt-3 w-56 space-y-1 rounded-2xl border border-rose-100 bg-white p-3 shadow-xl shadow-rose-100 dark:border-slate-700 dark:bg-slate-950">
                  {moreLinks.map((item) => (
                    <li key={item.to}>
                      <NavLink to={item.to} className={navLinkClass}>
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </nav>

        <div className="navbar-end min-w-fit gap-2">
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
              <button tabIndex={0} type="button" className="flex max-w-48 items-center gap-2 rounded-2xl border border-rose-100 bg-white px-2 py-1.5 shadow-sm transition hover:border-pink-200 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-pink-700">
                <img className="h-10 w-10 flex-none rounded-xl object-cover" alt={User?.Name || "User"} src={User?.imageUrl} />
                <span className="hidden text-left md:block">
                  <span className="block truncate text-sm font-black text-slate-900 dark:text-white">{User?.Name}</span>
                  <span className="block text-xs font-semibold text-pink-600">{User?.Role}</span>
                </span>
              </button>
              <ul tabIndex={0} className="dropdown-content z-50 mt-3 w-60 space-y-1 rounded-2xl border border-rose-100 bg-white p-3 shadow-xl shadow-rose-100 dark:border-slate-700 dark:bg-slate-950">
                <li>
                  <Link to="/dashboard" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-rose-50 hover:text-pink-700 active:bg-pink-600 active:text-white dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-pink-300">
                    <MdOutlineDashboard size={18} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/my-profile" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-rose-50 hover:text-pink-700 active:bg-pink-600 active:text-white dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-pink-300">
                    <FiUser size={18} />
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={logOut} type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-bold text-slate-700 transition hover:bg-rose-50 hover:text-pink-700 active:bg-pink-600 active:text-white dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-pink-300">
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
