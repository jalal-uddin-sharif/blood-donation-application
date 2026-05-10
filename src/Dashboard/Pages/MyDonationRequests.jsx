import React from "react";
import DonationRequest from "../../components/DonationRequest";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useAuth from "../../CustomHooks/useAuth";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const email = user?.email;
  const myAxios = useAxiosSecure();
  const { data, refetch } = useQuery({
    queryFn: () => getDonationData(),
    queryKey: ["donationrequest", user?.email],
  });

  const getDonationData = async () => {
    const { data } = await myAxios(`my-donation-request/${email}`);
    return data;
  };
  return (
    <div>
        <div className="my-10 text-center">
            <h1 className="text-3xl font-black text-slate-950">Your donation requests</h1>
            <p className="mt-2 text-sm text-slate-500">Track, update, and complete your requests from one place.</p>
        </div>
      <div>
        <DonationRequest data={data} refetch={refetch} />
      </div>
    </div>
  );
};

export default MyDonationRequests;
