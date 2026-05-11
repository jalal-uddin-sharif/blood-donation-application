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
    pending: "bg-amber-100 text-amber-700",
    inprogress: "bg-blue-100 text-blue-700",
    done: "bg-emerald-100 text-emerald-700",
    cancel: "bg-red-100 text-red-700",
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
          <div className="flex flex-col gap-3 border-b border-rose-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
            <h2 className="text-lg font-black text-slate-950">Donation Requests</h2>
            <p className="text-sm text-slate-500">{data.length} request{data.length > 1 ? "s" : ""} found</p>
            </div>
            {viewAll && (
              <Link
                to={"/dashboard/my-donation-requests"}
                className="soft-button px-4 py-2"
              >
                View all
              </Link>
            )}
          </div>
          <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
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
                    <span className={`status-pill ${statusClass[data.donationStatus] || "bg-slate-100 text-slate-700"}`}>
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
                        className="select select-bordered select-sm w-full max-w-xs rounded-xl border-rose-100 bg-white focus:outline-none"
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
                                className="rounded-xl bg-emerald-50 p-2 text-emerald-600 hover:bg-emerald-100"
                              >
                                <CiEdit size={20} />
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(data._id)}
                              title="delete"
                              className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100"
                            >
                              <MdDelete size={20} />
                            </button>
                            <Link to={`/view-details/${data._id}`}>
                              {" "}
                              <button
                                title="view"
                                className="rounded-xl bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
                              >
                                <IoMdEye size={20} />
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
            containerClassName={"flex flex-wrap justify-center gap-2 p-5"}
            pageClassName={"mx-1"}
            pageLinkClassName={"px-3 py-2 border border-rose-100 rounded-xl text-pink-700 hover:bg-pink-50"}
            previousLinkClassName={"px-3 py-2 border border-rose-100 rounded-xl text-pink-700 hover:bg-pink-50"}
            nextLinkClassName={"px-3 py-2 border border-rose-100 rounded-xl text-pink-700 hover:bg-pink-50"}
            activeLinkClassName={"!bg-pink-600 !text-white"}
            disabledLinkClassName={"text-gray-400 cursor-not-allowed"}
          />
        </div>
      )}
    </div>
  );
};

export default DonationRequest;
