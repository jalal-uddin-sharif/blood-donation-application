import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { IoMdCheckmarkCircleOutline, IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const DonationRequest = ({data}) => {

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
              <td>
                <div className="space-x-2">
                  <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-300">
                    <CiEdit size={20} color="green" />
                  </button>
                  <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-300">
                    <MdDelete size={20} color="red" />
                  </button>
                  <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-300">
                    <IoMdEye size={20} color="black" />
                  </button>
                </div>
              </td>
            </tr> */}
            {data?.map((data, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{data.recipientName}</td>
                <td>{data.district}, {data.upazila}</td>
                <td>{data.donationDates}</td>
                <td>{data.donationTimes}</td>
                <td>{data.donatinStatus}</td>
                {
                  data.donation_status === "inprogress" ?
                   <td>
                  <div>
                    <h1>{data.requesterName}</h1>
                    <h1>{data.requesterEmail}</h1>
                  </div>
                </td> : 
                <td>N/A</td>
                  
                }
                
                <td>
                  <div className="space-x-2 flex">
                    {data.donation_status === "inprogress" ? 
                      <>
                        <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-300">
                          <IoMdCheckmarkCircleOutline size={20} color="blue" />
                        </button>
                        <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-300">
                          <ImCancelCircle size={20} color="red" />
                        </button>
                      </> :
                      <>
                      <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-300">
                      <CiEdit size={20} color="green" />
                    </button>
                    <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-300">
                      <MdDelete size={20} color="red" />
                    </button>
                    <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-300">
                      <IoMdEye size={20} color="black" />
                    </button>
                      </>
                    }
                    
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
