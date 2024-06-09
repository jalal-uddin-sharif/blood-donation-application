import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { IoMdCheckmarkCircleOutline, IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useDbUser from "../CustomHooks/useDbUser";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";

const DonationRequest = ({ data, refetch }) => {
  const [User] = useDbUser();

const myAxios = useAxiosSecure()
  const handleStatus = async(id, e) =>{
    console.log(id, e);
    const {data} = await myAxios.patch(`/update-donation-status/${id}?status=${e.target.value}`)
    console.log(data);
    refetch()
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table border">
          <thead>
            <tr>
              <th></th>
              <th>Recipient Name</th>
              <th>Location</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Status</th>
              <th>Donor Name</th>
              {User?.Role !== "Donor" && <th>Change status</th>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((data, idx) => (
              <tr key={data._id}>
                <th>{idx + 1}</th>
                <td>{data.recipientName}</td>
                <td>
                  {data.district}, {data.upazila}
                </td>
                <td>{data.donationDates}</td>
                <td>{data.donationTimes}</td>
                <td>{data.donationStatus}</td>
                {data.donationStatus === "inprogress" ? (
                  <td>
                    <div>
                      <h1>{data.requesterName}</h1>
                      <h1>{data.requesterEmail}</h1>
                    </div>
                  </td>
                ) : (
                  <td>N/A</td>
                )}
                {User?.Role !== "Donor" && (
                  <td>
                    <select onChange={(e)=>handleStatus(data._id, e)} defaultValue={data.donationStatus} className="select select-sm bg-gray-100 w-full max-w-xs focus:outline-none">
                      <option value={"inprogress"}>Inprogress</option>
                      <option value={"pending"}>Pending</option>
                      <option value={"cancel"}>Cancel</option>
                      <option value={"done"}>Done</option>
                    </select>
                  </td>
                )}

                <td>
                  <div className="space-x-2 flex">
                    {data.donationStatus === "inprogress" ? (
                      <>
                        <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-300">
                          <IoMdCheckmarkCircleOutline size={20} color="blue" />
                        </button>
                        <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-300">
                          <ImCancelCircle size={20} color="red" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/dashboard/update-donation-requests/${data._id}`}
                        >
                          <button
                            title="Edit"
                            className="p-1 bg-gray-100 rounded-md hover:bg-gray-300"
                          >
                            <CiEdit size={20} color="green" />
                          </button>
                        </Link>
                        <button
                          title="delete"
                          className="p-1 bg-gray-100 rounded-md hover:bg-gray-300"
                        >
                          <MdDelete size={20} color="red" />
                        </button>
                        <button
                          title="view"
                          className="p-1 bg-gray-100 rounded-md hover:bg-gray-300"
                        >
                          <IoMdEye size={20} color="black" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-10">
        <button className="btn btn-secondary ">View my all request</button>
      </div>
    </div>
  );
};

export default DonationRequest;
