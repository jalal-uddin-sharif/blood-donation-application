import React from "react";
import { CiEdit } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { IoMdCheckmarkCircleOutline, IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const DonationRequest = () => {
  const fakeData = [
    {
      recipient_name: "John Doe",
      recipient_location: "New York, NY",
      donation_time: "14:30",
      donation_date: "2024-06-01",
      donation_status: "Done",
      donor_information: {
        name: "Alice Smith",
        email: "alice.smith@example.com",
      },
    },
    {
      recipient_name: "Jane Roe",
      recipient_location: "Los Angeles, CA",
      donation_time: "09:15",
      donation_date: "2024-06-02",
      donation_status: "Pending",
      donor_information: {
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
      },
    },
    {
      recipient_name: "Richard Miles",
      recipient_location: "Chicago, IL",
      donation_time: "16:45",
      donation_date: "2024-05-30",
      donation_status: "Canceled",
      donor_information: {
        name: "Catherine Lee",
        email: "catherine.lee@example.com",
      },
    },
    {
      recipient_name: "Linda Green",
      recipient_location: "Houston, TX",
      donation_time: "11:00",
      donation_date: "2024-06-03",
      donation_status: "Done",
      donor_information: {
        name: "David Brown",
        email: "david.brown@example.com",
      },
    },
    {
      recipient_name: "Michael Scott",
      recipient_location: "Philadelphia, PA",
      donation_time: "13:20",
      donation_date: "2024-06-01",
      donation_status: "inprogress",
      donor_information: {
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
      },
    },
  ];

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
            {fakeData.map((data, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{data.recipient_name}</td>
                <td>{data.recipient_location}</td>
                <td>{data.donation_time}</td>
                <td>{data.donation_date}</td>
                <td>{data.donation_status}</td>
                {
                  data.donation_status === "inprogress" ?
                   <td>
                  <div>
                    <h1>{data.donor_information.name}</h1>
                    <h1>{data.donor_information.email}</h1>
                  </div>
                </td> : 
                <td>N/A</td>
                  
                }
                
                <td>
                  <div className="space-x-2">
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
