import { Link } from "react-router-dom";
import { FiCheckCircle, FiMap, FiShield, FiUsers } from "react-icons/fi";

const Featured = () => {
  const features = [
    {
      icon: <FiUsers />,
      title: "Donor onboarding",
      desc: "Register donors with blood group, district, upazila, profile photo, and active account status.",
      href: "/register",
    },
    {
      icon: <FiMap />,
      title: "Smart donor search",
      desc: "Find donors by location and blood group so requests can be matched faster.",
      href: "/search-donors",
    },
    {
      icon: <FiCheckCircle />,
      title: "Request lifecycle",
      desc: "Track pending, in-progress, done, and cancelled requests from a clean dashboard.",
      href: "/blood-donation-request",
    },
    {
      icon: <FiShield />,
      title: "Role-based management",
      desc: "Admins and volunteers can manage users, requests, blog content, and operational status.",
      href: "/dashboard",
    },
  ];

  return (
    <section className="py-8 lg:py-12">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Platform workflow</p>
          <h2 className="section-title mt-2">Everything needed to coordinate blood donation.</h2>
          <p className="section-copy">
            The product is built around the actual operational flow: donor signup, request creation, matching, status updates, and admin oversight.
          </p>
        </div>
        <Link to="/blood-donation-request" className="soft-button w-fit">
          View active requests
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((item) => (
          <Link key={item.title} to={item.href} className="metric-card group">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-pink-600 text-xl text-white shadow-lg shadow-pink-200">
              {item.icon}
            </div>
            <h3 className="mt-5 text-lg font-black text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
            <span className="mt-5 inline-flex text-sm font-black text-pink-700 group-hover:text-pink-800">
              Learn more
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Featured;
