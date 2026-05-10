import { Link } from "react-router-dom";
import { BiDonateHeart } from "react-icons/bi";

const EmptyState = ({ title = "No data found", message, actionLabel, actionTo }) => {
  return (
    <div className="brand-panel mx-auto my-10 flex max-w-xl flex-col items-center px-6 py-12 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-lg bg-pink-100 text-pink-600">
        <BiDonateHeart size={30} />
      </div>
      <h2 className="mt-5 text-2xl font-black text-slate-950">{title}</h2>
      {message && <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">{message}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn-primary btn-sm mt-5 text-white">
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
