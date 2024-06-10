import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import useDbUser from "../CustomHooks/useDbUser";
import useAuth from "../CustomHooks/useAuth";
import toast from "react-hot-toast";

const ViewDetails = () => {
 const [User] = useDbUser()
 const {loading} = useAuth()
 const navigate = useNavigate()
  const { id } = useParams();
  console.log(id);
  const myAxios = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["donationData"],
    queryFn: async () => {
      const { data } = await myAxios(`/view-details/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  const {
    hospital,
    message,
    requesterName,
    requesterEmail,
    recipientName,
    address,
    district,
    upazila,
    bloodGroup,
    donationDates,
    donationTimes,
  } = data || {};

  const donationStatus = "inprogress"
  const donorName = User?.Name
  const donorEmail = User?.Email
  const donorInfo = {donorName, donorEmail, donationStatus}
  const handleConfirm = async() =>{
    const {data} =await myAxios.patch(`/confirm-donation/${id}`, donorInfo)
    if(data._id){
      navigate("/blood-donation-request")
      toast.success("donatin accepted")
    }
  }
  return (
    <div className="min-h flex justify-center items-center font-medium">
      <div className="max-w-s p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
            Requester Name : {requesterName}
          </h5>
        </a>
        <a href="#">
          <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
            Requester Email : {requesterEmail}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Recipient Name : {recipientName}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          District : {district}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Upazila : {upazila}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Address : {address}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Blood Group : {bloodGroup}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Hospital : {hospital}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Donation Date : {donationDates}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Donation Time : {donationTimes}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Message : {message}
        </p>
        <div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Donate     <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <p className="pt-4">
                Donor Name : {User?.Name}
              </p>
              <p className="">
                Donor Email : {User?.Email}
              </p>


              <div className="modal-action">
              <button onClick={handleConfirm} className="btn btn-outline">Confirm</button>
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
