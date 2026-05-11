import React from "react";
import { BiDonateBlood } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Stats = () => {
    const myAxios = useAxiosSecure()
    const {data} = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: async() => {
            const [donationRes, userRes] = await Promise.all([
              myAxios("/all-blood-donation-request"),
              myAxios("/all-users"),
            ])
            return {
              donations: donationRes.data,
              users: userRes.data,
            };
        },
        initialData: { donations: [], users: [] },
    })
    const cards = [
      {
        label: "Total Users",
        value: data.users.length,
        icon: <FaUsers className="h-full w-full" />,
      },
      {
        label: "Donation Requests",
        value: data.donations.length,
        icon: <BiDonateBlood className="h-full w-full" />,
      },
      {
        label: "Total Funding",
        value: 0,
        icon: <GiMoneyStack className="h-full w-full" />,
      },
    ];
  return (
    <div className="my-8 grid gap-5 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="metric-card">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-pink-600 p-4 text-white shadow-lg shadow-pink-100">
            {card.icon}
          </div>
          <p className="mt-4 text-sm font-semibold text-slate-500">{card.label}</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
