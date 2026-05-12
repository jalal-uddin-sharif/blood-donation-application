import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import TextLogo from "../components/TextLogo";

const Footer = () => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/blood-donation-request", label: "Requests" },
    { to: "/search-donors", label: "Find Donors" },
    { to: "/blogs", label: "Blogs" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms" },
    { to: "/register", label: "Become a Donor" },
  ];

  const contacts = [
    { icon: <FiMapPin />, text: "Chittagong, Bangladesh" },
    { icon: <FiPhone />, text: "+880 1572223906" },
    { icon: <FiMail />, text: "Admin@RedLoveUser.com" },
  ];

  return (
    <footer className="mt-16 border-t border-rose-100 bg-white">
      <div className="app-container py-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <TextLogo />
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              RedLove helps donors, volunteers, and admins coordinate urgent blood requests with a clear and reliable workflow.
            </p>
            <div className="mt-5 flex gap-2">
              {[FaFacebookF, FaLinkedinIn, FaGithub].map((Icon, index) => (
                <a key={index} href="https://github.com/" className="grid h-10 w-10 place-items-center rounded-xl border border-rose-100 text-pink-700 transition hover:bg-pink-600 hover:text-white" aria-label="Social link">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-slate-950">Explore</h3>
            <ul className="mt-4 space-y-2">
              {links.map((item) => (
                <li key={item.to}>
                  <Link className="text-sm font-semibold text-slate-600 transition hover:text-pink-700" to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-slate-950">Contact</h3>
            <ul className="mt-4 space-y-3">
              {contacts.map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-50 text-pink-700">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-rose-100 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 RedLove. All rights reserved.</p>
          <p>Built for fast donor response and transparent coordination.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
