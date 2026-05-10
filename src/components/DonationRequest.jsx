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
import EmptyState from "./EmptyState";

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
  const pageCount = Math.ceil((data?.length || 0) / itemsPerPage);

  const statusClass = {
    pending: "badge-warning",
    inprogress: "badge-info",
    done: "badge-success",
    cancel: "badge-error",
  };

  return (
    <div>
      {data?.length === 0 && (
        <EmptyState
          title="No donation requests yet"
          message="Create a request or check again later when new requests are available."
          actionLabel={User?.Role === "Donor" ? "Create request" : undefined}
          actionTo={User?.Role === "Donor" ? "/dashboard/create-donation-requests" : undefined}
        />
      )}
      {data?.length > 0 && (
        <div className="brand-panel overflow-hidden">
          <div className="border-b border-pink-100 px-5 py-4">
            <h2 className="text-lg font-black text-slate-950">Donation Requests</h2>
            <p className="text-sm text-slate-500">{data.length} request{data.length > 1 ? "s" : ""} found</p>
          </div>
          <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-pink-50 text-slate-700">
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
                  <td>
                    <span className={`badge ${statusClass[data.donationStatus] || "badge-ghost"} badge-sm font-semibold`}>
                      {data.donationStatus}
                    </span>
                  </td>
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
                        className="select select-primary select-sm w-full max-w-xs bg-white focus:outline-none"
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
                              className="rounded-md bg-pink-50 p-1 text-blue-600 hover:bg-pink-100"
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
                              className="rounded-md bg-pink-50 p-1 text-red-600 hover:bg-pink-100"
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
                                className="rounded-md bg-pink-50 p-1 text-emerald-600 hover:bg-pink-100"
                              >
                                <CiEdit size={20} color="green" />
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(data._id)}
                              title="delete"
                              className="rounded-md bg-pink-50 p-1 text-red-600 hover:bg-pink-100"
                            >
                              <MdDelete size={20} color="red" />
                            </button>
                            <Link to={`/view-details/${data._id}`}>
                              {" "}
                              <button
                                title="view"
                                className="rounded-md bg-pink-50 p-1 text-slate-700 hover:bg-pink-100"
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

          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center gap-1 p-5"}
            pageClassName={"mx-1"}
            pageLinkClassName={"px-3 py-1 border border-pink-100 rounded-md text-pink-700 hover:bg-pink-50"}
            previousLinkClassName={"px-3 py-1 border border-pink-100 rounded-md text-pink-700 hover:bg-pink-50"}
            nextLinkClassName={"px-3 py-1 border border-pink-100 rounded-md text-pink-700 hover:bg-pink-50"}
            activeLinkClassName={"bg-pink-600 text-white"}
            disabledLinkClassName={"text-gray-400 cursor-not-allowed"}
          />

          {viewAll && (
            <div className="flex justify-end mt-10">
              <Link
                to={"/dashboard/my-donation-requests"}
                className="btn btn-primary text-white"
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
