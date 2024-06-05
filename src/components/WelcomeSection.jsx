import React from "react";
import useAuth from "../CustomHooks/useAuth";
import DonationRequest from "./DonationRequest";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const WelcomeSection = () => {
   const { user } = useAuth();
  const email = user?.email
  const myAxios = useAxiosSecure()
  const {data}=useQuery({
      queryFn: ()=> getDonationData(),
      queryKey: ['recentDonation', email]
  })

  const getDonationData = async() =>{
      const {data} = await myAxios(`my-recent-donation/${email}`)
      return data;
  }
 
  return (
    <div>
      <div className="my-10">
        <h1 className="text-lg font-medium">
          Hello, <span className="text-green-700">{user?.displayName}</span>
        </h1>
      </div>

      {/* recent donation */}
      <DonationRequest data={data}/>
    </div>
  );
};

export default WelcomeSection;
