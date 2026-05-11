import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import EmptyState from "../components/EmptyState";

const BloodDonationRequest = () => {
  const myAxios = useAxiosSecure();
  const { data = [] } = useQuery({
    queryKey: ["pendingData"],
    queryFn: async () => {
      const { data } = await myAxios("/pending-donation-data");
      return data;
    },
  });

  return (
    <section className="page-shell min-h">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Open requests</p>
          <h1 className="section-title mt-2">Blood donation requests</h1>
          <p className="section-copy">Browse active pending requests and open details when you are ready to donate.</p>
        </div>
        <Link to="/search-donors" className="soft-button w-fit">Search donors</Link>
      </div>

      {data.length < 1 && (
        <EmptyState title="No pending requests" message="There are no public pending requests right now. Please check again later." />
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data.map((item) => (
          <article key={item._id} className="metric-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-pink-600">{item.bloodGroup} needed</p>
                <h2 className="mt-2 text-xl font-black text-slate-950">{item.recipientName}</h2>
              </div>
              <span className="status-pill bg-amber-100 text-amber-700">{item.donationStatus}</span>
            </div>
            <div className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
              <p className="flex items-center gap-2"><FiMapPin className="text-pink-600" /> {item.district}, {item.upazila}</p>
              <p className="flex items-center gap-2"><FiCalendar className="text-pink-600" /> {item.donationDates}</p>
              <p className="flex items-center gap-2"><FiClock className="text-pink-600" /> {item.donationTimes}</p>
            </div>
            <Link to={`/view-details/${item._id}`} className="action-button mt-6 w-full">
              View details
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BloodDonationRequest;
