import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FiCalendar, FiClock, FiMapPin, FiUserCheck } from "react-icons/fi";
import { FaHospital } from "react-icons/fa";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import Loader from "../components/Loader";
import useDbUser from "../CustomHooks/useDbUser";
import toast from "react-hot-toast";

const ViewDetails = () => {
  const [User] = useDbUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const myAxios = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["donationData", id],
    queryFn: async () => {
      const { data } = await myAxios(`/view-details/${id}`);
      return data;
    },
  });

  if (isLoading) return <Loader />;

  const donorInfo = {
    donorName: User?.Name,
    donorEmail: User?.Email,
    donationStatus: "inprogress",
  };

  const handleConfirm = async () => {
    const { data: result } = await myAxios.patch(`/confirm-donation/${id}`, donorInfo);
    if (result._id) {
      navigate("/blood-donation-request");
      toast.success("Donation accepted");
    }
  };

  const details = [
    { icon: <FiMapPin />, label: "Location", value: `${data?.district}, ${data?.upazila}` },
    { icon: <FaHospital />, label: "Hospital", value: data?.hospital },
    { icon: <FiCalendar />, label: "Donation Date", value: data?.donationDates },
    { icon: <FiClock />, label: "Donation Time", value: data?.donationTimes },
  ];

  return (
    <section className="page-shell min-h">
      <div className="brand-section overflow-hidden">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="bg-slate-950 p-7 text-white sm:p-10">
            <p className="text-sm font-black uppercase text-pink-300">Request details</p>
            <h1 className="mt-3 text-4xl font-black leading-tight">{data?.bloodGroup} blood needed</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">{data?.message}</p>
            <div className="mt-8 rounded-3xl bg-white/10 p-5">
              <p className="text-xs font-black uppercase text-pink-200">Recipient</p>
              <h2 className="mt-1 text-2xl font-black">{data?.recipientName}</h2>
              <p className="mt-2 text-sm text-slate-300">{data?.address}</p>
            </div>
          </aside>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {details.map((item) => (
                <div key={item.label} className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-pink-700">{item.icon}</span>
                    <div>
                      <p className="text-xs font-black uppercase text-slate-400">{item.label}</p>
                      <p className="font-bold text-slate-950">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-rose-100 p-5">
              <h3 className="text-lg font-black text-slate-950">Requester information</h3>
              <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 sm:grid-cols-2">
                <p>Name: <span className="text-slate-950">{data?.requesterName}</span></p>
                <p>Email: <span className="text-slate-950">{data?.requesterEmail}</span></p>
              </div>
            </div>

            <button className="action-button mt-6 gap-2" onClick={() => document.getElementById("donate_modal").showModal()} type="button">
              <FiUserCheck />
              Donate
            </button>

            <dialog id="donate_modal" className="modal">
              <div className="modal-box rounded-3xl">
                <h3 className="text-xl font-black text-slate-950">Confirm donation</h3>
                <p className="pt-4 text-sm font-semibold text-slate-600">Donor Name: {User?.Name}</p>
                <p className="text-sm font-semibold text-slate-600">Donor Email: {User?.Email}</p>
                <div className="modal-action">
                  <button onClick={handleConfirm} className="action-button px-4 py-2" type="button">Confirm</button>
                  <form method="dialog">
                    <button className="soft-button px-4 py-2">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewDetails;
