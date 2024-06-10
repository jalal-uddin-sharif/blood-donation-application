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
        <div className="text-center  my-10 text-lg font-medium">
            <h1>Your All donation request</h1>
        </div>
      <div>
        <DonationRequest data={data} refetch={refetch} />
      </div>
    </div>
  );
};

export default MyDonationRequests;
