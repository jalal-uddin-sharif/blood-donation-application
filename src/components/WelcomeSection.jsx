import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

const WelcomeSection = ({ User }) => {
  const message = {
    Donor: "Thank you for staying available when someone needs blood urgently.",
    Volunteer: "Review requests, support content, and keep the donation flow moving.",
    Admin: "Manage requests, donors, volunteers, users, and published resources.",
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="section-kicker">Dashboard</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
          Welcome back, <span className="text-pink-700">{User?.Name}</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          {message[User?.Role] || "Monitor the RedLove blood donation workflow from one place."}
        </p>
      </div>
      <Link to="/dashboard/create-donation-requests" className="action-button gap-2">
        <FiPlusCircle />
        New request
      </Link>
    </div>
  );
};

export default WelcomeSection;
