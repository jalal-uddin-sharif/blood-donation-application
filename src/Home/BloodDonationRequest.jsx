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
      <div className="text-center my-10 text-lg font-medium">
        <h1>Blood Donation Requests</h1>
      </div>
      { data?.length < 1 &&
      <div className="text-center text-3xl font-bold">
        <h1>No data found</h1>
      </div>
      }
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-10">
        {data?.map(item=>(
           <div key={item._id} className="block rounded-lg space-y-2 bg-gray-100 p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
          <h5 className="  leading-tight">Recipient Name : <span className="text-md font-medium">{item.recipientName}</span></h5>
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
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
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
