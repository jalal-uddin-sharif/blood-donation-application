import { useState } from "react";
import { FiMapPin, FiSearch, FiUser } from "react-icons/fi";
import DistrictUpazila from "../components/DistrictUpazila";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import EmptyState from "../components/EmptyState";

const SearchDonors = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [label] = useState(true);
  const [donationData, setDonationData] = useState([]);
  const [searched, setSearched] = useState(false);
  const myAxios = useAxiosSecure();

  const handleSearch = async () => {
    const { data } = await myAxios("/search-donors", {
      params: { bloodGroup, district, upazila },
    });
    setDonationData(data);
    setSearched(true);
  };

  return (
    <section className="page-shell min-h">
      <div className="brand-section overflow-hidden">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-slate-950 p-7 text-white sm:p-10">
            <p className="text-sm font-black uppercase text-pink-300">Find donors</p>
            <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Search by blood group and location.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Use district and upazila filters to narrow results and identify possible donors near the request location.
            </p>
          </div>
          <div className="p-5 sm:p-7 lg:p-10">
            <div className="grid gap-4">
              <select onChange={(e) => setBloodGroup(e.target.value)} required className="select select-bordered w-full rounded-xl border-rose-100 bg-white text-slate-700 focus:outline-none">
                <option disabled selected>Select blood group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              <DistrictUpazila setDistrict={setDistrict} setUpazila={setUpazila} district={district} label={label} />
              <button onClick={handleSearch} className="action-button gap-2" type="button">
                <FiSearch />
                Search donors
              </button>
            </div>
          </div>
        </div>
      </div>

      {searched && donationData.length === 0 && (
        <EmptyState title="No donors found" message="Try another blood group or nearby location." />
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {donationData.map((data) => (
          <article key={data._id} className="metric-card">
            <div className="flex items-center justify-between">
              <span className="rounded-2xl bg-pink-600 px-4 py-2 text-xl font-black text-white">{data.bloodGroup}</span>
              <span className="status-pill bg-emerald-100 text-emerald-700">{data.donationStatus || "available"}</span>
            </div>
            <h2 className="mt-5 flex items-center gap-2 text-xl font-black text-slate-950">
              <FiUser className="text-pink-600" />
              {data.requesterName}
            </h2>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
              <FiMapPin className="text-pink-600" />
              {data.district}, {data.upazila}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SearchDonors;
