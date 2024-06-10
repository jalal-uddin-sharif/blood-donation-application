import React, { useState } from "react";
import { BiDonateBlood } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Stats = () => {
    const [donation, setDonation] = useState([])
    const [user, setUser] = useState([])
    const myAxios = useAxiosSecure()
    const {data:bdDonationRequest} = useQuery({
        queryKey: ["all-donation-stats"],
        queryFn: async() => {
            const {data} = await myAxios("/all-blood-donation-request")
            setDonation(data)
            const user = await myAxios("/all-users")
            setUser(user.data)
            return data;

        }
    })
  return (
    <div className="m-10 grid gap-5 sm:grid-cols-3 mx-auto max-w-screen-lg">
      <div className="px-4 py-6 shadow-lg shadow-blue-100">
      <h1 className="h-14 w-14 rounded-xl bg-rose-50 p-4 ">
          <FaUsers  color="green" className="h-full w-full" />
        </h1>
        <p className="mt-4 font-medium">Total Users</p>
        <p className="mt-2 text-xl font-medium">
          {user?.length}
        </p>

      </div>
      <div className="px-4 py-6 shadow-lg shadow-blue-100">
      <h1 className="h-14 w-14 rounded-xl bg-rose-50 p-4 ">
          <BiDonateBlood color="green" className="h-full w-full" />
        </h1>
        <p className="mt-4 font-medium">Total blood donation request</p>
        <p className="mt-2 text-xl font-medium">
         {donation?.length}
        </p>

      </div>
      <div className="px-4 py-6 shadow-lg shadow-blue-100">
        <h1 className="h-14 w-14 rounded-xl bg-rose-50 p-4 ">
          <GiMoneyStack color="green" className="h-full w-full" />
        </h1>
        <p className="mt-4 font-medium">Total Funding</p>
        <p className="mt-2 text-xl font-medium">
          0
        </p>
      </div>
    </div>
  );
};

export default Stats;
