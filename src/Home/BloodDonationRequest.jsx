import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import DistrictUpazila from "../components/DistrictUpazila";
import EmptyState from "../components/EmptyState";

const BloodDonationRequest = () => {
  const myAxios = useAxiosSecure();
  const [filters, setFilters] = useState({
    search: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    sort: "date-asc",
    page: 1,
  });

  const { data = { items: [], total: 0, totalPages: 0 }, isLoading } = useQuery({
    queryKey: ["pendingData", filters],
    queryFn: async () => {
      const { data } = await myAxios("/pending-donation-data", {
        params: { ...filters, limit: 8 },
      });
      return data;
    },
  });

  const requests = Array.isArray(data) ? data : data.items;
  const totalPages = Array.isArray(data) ? 1 : data.totalPages;

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value, page: 1 }));
  };

  const skeletonCards = Array.from({ length: 8 }, (_, index) => (
    <div key={index} className="metric-card animate-pulse">
      <div className="h-40 rounded-xl bg-rose-100 dark:bg-slate-700" />
      <div className="mt-5 h-4 w-24 rounded bg-rose-100 dark:bg-slate-700" />
      <div className="mt-4 h-7 w-44 rounded bg-rose-100 dark:bg-slate-700" />
      <div className="mt-6 space-y-3">
        <div className="h-4 rounded bg-rose-100 dark:bg-slate-700" />
        <div className="h-4 rounded bg-rose-100 dark:bg-slate-700" />
        <div className="h-4 rounded bg-rose-100 dark:bg-slate-700" />
      </div>
    </div>
  ));

  return (
    <section className="page-shell min-h">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Open requests</p>
          <h1 className="section-title mt-2">Blood donation requests</h1>
          <p className="section-copy">Browse, filter, and sort active pending requests from the live database.</p>
        </div>
        <Link to="/search-donors" className="soft-button w-fit">Search donors</Link>
      </div>

      <div className="brand-panel mt-8 grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-5">
        <label className="lg:col-span-2">
          <span>Search</span>
          <input className="brand-input" value={filters.search} onChange={(e) => updateFilter("search", e.target.value)} placeholder="Recipient, hospital, district" />
        </label>
        <label>
          <span>Blood group</span>
          <select className="select select-bordered w-full rounded-xl border-rose-100 bg-white dark:bg-slate-950" value={filters.bloodGroup} onChange={(e) => updateFilter("bloodGroup", e.target.value)}>
            <option value="">All groups</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </label>
        <div>
          <DistrictUpazila district={filters.district} setDistrict={(value) => updateFilter("district", value)} setUpazila={(value) => updateFilter("upazila", value)} label />
        </div>
        <label>
          <span>Sort</span>
          <select className="select select-bordered w-full rounded-xl border-rose-100 bg-white dark:bg-slate-950" value={filters.sort} onChange={(e) => updateFilter("sort", e.target.value)}>
            <option value="date-asc">Soonest first</option>
            <option value="date-desc">Latest date</option>
            <option value="group-asc">Blood group</option>
            <option value="location-asc">Location</option>
          </select>
        </label>
      </div>

      {!isLoading && requests.length < 1 && (
        <EmptyState title="No pending requests" message="Try another blood group, location, or search term." />
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {isLoading && skeletonCards}
        {!isLoading && requests.map((item) => (
          <article key={item._id} className="metric-card flex h-full flex-col">
            <img
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=700&q=80"
              alt={`${item.bloodGroup} donation request`}
              loading="lazy"
              className="mb-5 h-40 w-full rounded-xl object-cover"
            />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-pink-600">{item.bloodGroup} needed</p>
                <h2 className="mt-2 text-xl font-black text-slate-950 dark:text-white">{item.recipientName}</h2>
              </div>
              <span className="status-pill bg-amber-100 text-amber-700">{item.donationStatus}</span>
            </div>
            <div className="mt-5 space-y-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-2"><FiMapPin className="text-pink-600" /> {item.district}, {item.upazila}</p>
              <p className="flex items-center gap-2"><FiCalendar className="text-pink-600" /> {item.donationDates}</p>
              <p className="flex items-center gap-2"><FiClock className="text-pink-600" /> {item.donationTimes}</p>
            </div>
            <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{item.message}</p>
            <Link to={`/view-details/${item._id}`} className="action-button mt-auto w-full">
              View details
            </Link>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => setFilters((current) => ({ ...current, page }))}
              className={`rounded-xl border px-4 py-2 text-sm font-black ${
                page === filters.page ? "border-pink-600 bg-pink-600 text-white" : "border-rose-100 bg-white text-pink-700 dark:bg-slate-900"
              }`}
              type="button"
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default BloodDonationRequest;
