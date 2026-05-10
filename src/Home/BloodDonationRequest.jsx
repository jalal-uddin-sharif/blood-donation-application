import React from "react";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const BloodDonationRequest = () => {
    const myAxios = useAxiosSecure()
    const {data} = useQuery({
        queryKey: ["pendingData"],
        queryFn: async()=>{
            const {data} = await myAxios("/pending-donation-data")
            return data;
        }
    })

  return (
    <div className="min-h">
      <div className="my-10 text-center">
        <h1 className="text-3xl font-black text-slate-950">Blood Donation Requests</h1>
      </div>
      { data?.length < 1 &&
      <div className="text-center text-3xl font-bold">
        <h1>No data found</h1>
      </div>
      }
      <div className="my-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {data?.map(item=>(
           <div key={item._id} className="brand-panel block space-y-2 p-6 text-slate-700">
          <h5 className="leading-tight text-slate-900">Recipient Name : <span className="text-md font-semibold text-pink-600">{item.recipientName}</span></h5>
          <p className="text-base">
           Location: {item.district}, {item.upazila}
          </p>
          <p className="text-base">
           Donation Date: {item.donationDates}
          </p>
          <p className=" text-base">
           Donation Date: {item.donationTimes}
          </p>
          <Link to={`/view-details/${item._id}`}
            type="button"
            className="btn btn-primary btn-sm mt-2 text-white"
            data-twe-ripple-init
            data-twe-ripple-color="light"
          >
            View details
          </Link>
        </div> 
        ))
        }
        
      </div>
    </div>
  );
};

export default BloodDonationRequest;
