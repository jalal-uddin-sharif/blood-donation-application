import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { CiEdit } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { IoMdCheckmarkCircleOutline, IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useDbUser from "../CustomHooks/useDbUser";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

const DonationRequest = ({ data, refetch, volunteer, viewAll }) => {
  const [User] = useDbUser();
  const myAxios = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handleStatusbyUser = async (id, e) => {
    const { data } = await myAxios.patch(
      `/user-donation-status-update/${id}?status=${e}`
    );
    refetch();
  };

  const handleStatus = async (id, e) => {
    const { data } = await myAxios.patch(
      `/update-donation-status/${id}?status=${e}`
    );
    refetch();
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await myAxios.delete(`delete-donation-request/${id}`);
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your request has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentData = data?.slice(offset, offset + itemsPerPage);
  const pageCount = Math?.ceil(data?.length / itemsPerPage);

  return (
    <div>
      {data?.length === 0 && (
        <div className="min-h flex justify-center items-center">
          <h1 className="text-center text-3xl font-bold">No data Found</h1>
        </div>
      )}
      {data?.length > 0 && (
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
              {currentData.map((data, idx) => (
                <tr key={data._id}>
                  <th>{offset + idx + 1}</th>
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
                        <h1>{data?.donorName}</h1>
                        <h1>{data?.donorEmail}</h1>
                      </div>
                    </td>
                  ) : (
                    <td>N/A</td>
                  )}
                  {User?.Role !== "Donor" && (
                    <td>
                      <select
                        onChange={(e) => handleStatus(data._id, e.target.value)}
                        defaultValue={data.donationStatus}
                        className="select select-sm bg-gray-100 w-full max-w-xs focus:outline-none"
                      >
                        <option value={"inprogress"}>Inprogress</option>
                        <option value={"pending"}>Pending</option>
                        <option value={"cancel"}>Cancel</option>
                        <option value={"done"}>Done</option>
                      </select>
                    </td>
                  )}

                  {!volunteer && (
                    <td>
                      <div className="space-x-2 flex">
                        {data.donationStatus === "inprogress" ? (
                          <>
                            <button
                              onClick={() =>
                                handleStatusbyUser(data._id, "done")
                              }
                              className="p-1 bg-gray-100 rounded-md hover:bg-gray-300"
                            >
                              <IoMdCheckmarkCircleOutline
                                size={20}
                                color="blue"
                              />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusbyUser(data._id, "cancel")
                              }
                              className="p-1 bg-gray-100 rounded-md hover:bg-gray-300"
                            >
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
                              onClick={() => handleDelete(data._id)}
                              title="delete"
                              className="p-1 bg-gray-100 rounded-md hover:bg-gray-300"
                            >
                              <MdDelete size={20} color="red" />
                            </button>
                            <Link to={`/view-details/${data._id}`}>
                              {" "}
                              <button
                                title="view"
                                className="p-1 bg-gray-100 rounded-md hover:bg-gray-300"
                              >
                                <IoMdEye size={20} color="black" />
                              </button>
                            </Link>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center mt-5"}
            pageClassName={"mx-1"}
            pageLinkClassName={"px-3 py-1 border rounded-md text-blue-600 hover:bg-blue-100"}
            previousLinkClassName={"px-3 py-1 border rounded-md text-blue-600 hover:bg-blue-100"}
            nextLinkClassName={"px-3 py-1 border rounded-md text-blue-600 hover:bg-blue-100"}
            activeLinkClassName={"bg-blue-600 text-white"}
            disabledLinkClassName={"text-gray-400 cursor-not-allowed"}
          />

          {viewAll && (
            <div className="flex justify-end mt-10">
              <Link
                to={"/dashboard/my-donation-requests"}
                className="btn btn-secondary"
              >
                View my all requests
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DonationRequest;
