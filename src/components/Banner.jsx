import { Link } from "react-router-dom";
import { BiDonateBlood } from "react-icons/bi";
import { FiActivity, FiMapPin, FiSearch } from "react-icons/fi";

const Banner = () => {
  const stats = [
    { label: "Active requests", value: "24/7" },
    { label: "Blood groups", value: "8" },
    { label: "Response flow", value: "Fast" },
  ];

  return (
    <section className="page-shell">
      <div className="grid overflow-hidden rounded-[2rem] border border-rose-100 bg-white shadow-xl shadow-rose-100/80 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 py-2 text-sm font-black text-pink-700">
            <FiActivity />
            Emergency blood coordination platform
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Find the right blood donor before time runs out.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            RedLove connects donors, recipients, volunteers, and admins in one responsive dashboard so urgent blood requests can move from pending to fulfilled with less friction.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/search-donors" className="action-button gap-2">
              <FiSearch />
              Search donors
            </Link>
            <Link to="/register" className="soft-button gap-2">
              <BiDonateBlood />
              Become a donor
            </Link>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl bg-rose-50 p-4">
                <p className="text-2xl font-black text-slate-950">{item.value}</p>
                <p className="mt-1 text-xs font-bold uppercase text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] bg-slate-950 lg:min-h-[620px]">
          <img
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80"
            alt="Blood donation care"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/20 bg-white/90 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-pink-600 text-white">
                <FiMapPin size={22} />
              </span>
              <div>
                <h2 className="text-lg font-black text-slate-950">Location-based donor search</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Filter by blood group, district, and upazila to narrow down possible donors quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
