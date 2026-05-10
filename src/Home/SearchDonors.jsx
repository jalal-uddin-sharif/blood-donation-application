import React, { useState } from "react";
import DistrictUpazila from "../components/DistrictUpazila";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SearchDonors = () => {
  const [bloodGroup, setBloodGroup] = useState(null);
  const [district, setDistrict] = useState(" ");
  const [upazila, setUpazila] = useState(null);
  const [label, setLevel] = useState(true);
  const [donationData, setDonationData] = useState([]);
  const handleBloodGroup = (e) => {
    setBloodGroup(e.target.value);
  };

  const myAxios = useAxiosSecure();

  const handleSearch = async () => {
    const { data } = await myAxios(`/search-donors`, {
      params: {
        bloodGroup,
        district,
        upazila,
      },
    });
    setDonationData(data)
  };
  return (
    <div>
      <div className="brand-section my-10 flex min-h-52 flex-col items-center justify-center px-4 py-8">
        <div className="flex w-full flex-col gap-2 px-4 lg:flex-row">
          <select
            onChange={handleBloodGroup}
            required
            className="select select-primary w-full bg-white text-pink-600 focus:outline-none lg:w-3/4"
          >
            <option disabled selected>
              Select Blood Group
            </option>
            <option value={"A+"}>A+</option>
            <option value={"A-"}>A-</option>
            <option value={"B+"}>B+</option>
            <option value={"B-"}>B-</option>
            <option value={"AB+"}>AB+</option>
            <option value={"AB-"}>AB-</option>
            <option value={"O+"}>O+</option>
            <option value={"O-"}>O-</option>
          </select>
          <DistrictUpazila
            setDistrict={setDistrict}
            setUpazila={setUpazila}
            district={district}
            label={label}
          />
        </div>
        <button
          onClick={handleSearch}
          className="btn btn-primary btn-wide my-4 text-white"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {donationData?.map((data) => (
          <div key={data._id}>
            <a className="brand-panel block max-w-sm p-6 hover:border-pink-300">
              <h5 className="mb-2 text-2xl font-bold tracking-normal text-slate-900">
                Blood Group : <span className="text-pink-600">{data.bloodGroup}</span>
              </h5>
              <p>Requester Name: {data.requesterName}</p>
              <p>Address: {data.district},{data.upazila}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDonors;
