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
      <div className="h-52 bg-gray-100 my-10 flex flex-col justify-center items-center px-4">
        <div className="flex  w-full gap-2 px-4">
          <select
            onChange={handleBloodGroup}
            required
            className="select select-info w-3/4 focus:outline-none bg-gray-50 text-red-500 text-xl"
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
          className="btn btn-outline btn-wide my-4"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {donationData?.map((data) => (
          <div key={data._id}>
            <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Blood Group : <span className="text-red-700">{data.bloodGroup}</span>
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
