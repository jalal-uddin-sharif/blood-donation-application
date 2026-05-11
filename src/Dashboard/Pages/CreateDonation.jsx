import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../CustomHooks/useAuth";
import DistrictUpazila from "../../components/DistrictUpazila";
import DatePickerkeep from "../../components/DatePickerkeep";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import useDbUser from "../../CustomHooks/useDbUser";

const CreateDonation = () => {
  const { user } = useAuth();
  const [district, setDistrict] = useState();
  const [upazila, setUpazila] = useState();
  const [bloodGroup, setBloodGroup] = useState();
  const [error, setError] = useState();
  const [groupError, setGroupError] = useState();
  const [User] = useDbUser()
 

  const myAxios = useAxiosSecure()

  const [donationDate, setDonationDate] = useState(
    new Date().toLocaleDateString()
  );
  const [donationTime, setDonationTime] = useState(new Date());
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }, reset
  } = useForm();



  const onSubmit =async (data) => {

    if(User.status === "block"){
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "only active user can create donation request",
      });
    }

    if (groupError === undefined) {
      return setGroupError("Blood group required");
    }


    if (district === undefined || upazila === undefined) {
      return setError("Address must be required");
    }
  
setError("")
    const requesterName = user?.displayName;
    const requesterEmail = user?.email;
    const recipientName = data.recipientName;
    const hospital = data.hospital;
    const message = data.message;
    const address = data.address;
    const donationStatus = "pending";
    const donationDates = donationDate
    const donationTimes = donationTime.toLocaleTimeString()

    const donationReqData = {
      requesterName,
      requesterEmail,
      recipientName,
      hospital,
      message,
      address,
      district,
      upazila,
      bloodGroup,
      donationStatus,
      donationDates,
      donationTimes
    };
  

    const donationData = await myAxios.post("/new-donation-request", donationReqData)
    
    if(donationData.data.insertedId){
   
      Swal.fire({
        icon: "success",
        title: "Your request submitted",
        showConfirmButton: false,
        timer: 1500
      });   
      reset()
    }
  };

  const handleBloodGroup = (e) => {
    setBloodGroup(e.target.value);
    setGroupError("")
  };



  return (
    <div className="page-shell">
      <div className="mb-6">
        <p className="section-kicker">Donation workflow</p>
        <h1 className="section-title mt-2">Create new donation request</h1>
        <p className="section-copy">Add recipient, location, hospital, schedule, and message details for the request board.</p>
      </div>
      <form className="form-card" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 grid gap-3 rounded-2xl bg-rose-50 p-4 sm:grid-cols-2">
          <h2 className="text-sm font-bold text-slate-700">
            Requester name:{" "}
            <span className="text-pink-600"> {user?.displayName} </span>
          </h2>
          <h2 className="text-sm font-bold text-slate-700">
            Requester email:{" "}
            <span className="text-pink-600"> {user?.email} </span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="w-full">
            <label>Recipient Name</label>
            <input
              className="brand-input mb-2"
              placeholder="Recipient Name"
              name="recipientName"
              {...register("recipientName", { required: true })}
              aria-invalid={errors.recipientName ? "true" : "false"}
            />
            {errors.recipientName?.type === "required" && (
              <p className="-mt-2 text-red-700" role="alert">
                Recipient Name is required
              </p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="">Blood Group</label>
            <select
              onChange={handleBloodGroup}
              required
              className="select select-bordered w-full rounded-xl border-rose-100 bg-white text-slate-700 focus:outline-none"
            >
              <option disabled selected>
                Select Blood Group
              </option>
              <option value={"A+"}>A+</option>
              <option value={"A-"}>A-</option>
              <option value={"B+"}>B+</option>
              <option value={"B-"}>B-</option>
              <option value={"AB+"}>AB+</option>
              <option value={"AB-"}>AB-</option>
              <option value={"O+"}>O+</option>
              <option value={"O-"}>O-</option>
            </select>
            { (
              <p className="text-red-700" role="alert">
                {groupError}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5">
          <DistrictUpazila
            setDistrict={setDistrict}
            setUpazila={setUpazila}
            district={district}
          />
          { (
            <p className=" text-red-700" role="alert">
              {error}
            </p>
          )}
        </div>

        <div>
          <label>Hospital Name</label>
          <input
            className="brand-input mb-2"
            placeholder="Hospital Name"
            name="HospitalName"
            {...register("hospital", { required: true })}
            aria-invalid={errors.hospital ? "true" : "false"}
          />
          {errors.hospital?.type === "required" && (
            <p className="-mt-2 text-red-700" role="alert">
              Name is required
            </p>
          )}
        </div>
        <div>
          <label>Full Address</label>
          <input
            className="brand-input mb-2"
            placeholder="ex- chittagong,rangunia, padua-rajarhat"
            name="address"
            {...register("address", { required: true })}
            aria-invalid={errors.address ? "true" : "false"}
          />
          {errors.address?.type === "required" && (
            <p className="-mt-2 text-red-700" role="alert">
              Name is required
            </p>
          )}
        </div>

        <div>
          <DatePickerkeep
          donationDate={donationDate}
          donationTime={donationTime}
            setDonationDate={setDonationDate}
            setDonationTime={setDonationTime}
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            className="brand-input textarea mb-2 min-h-32"
            placeholder="ex- chittagong,rangunia, padua-rajarhat"
            name="message"
            {...register("message", { required: true })}
            aria-invalid={errors.message ? "true" : "false"}
          />
          {errors.message?.type === "required" && (
            <p className="-mt-2 text-red-700" role="alert">
              Name is required
            </p>
          )}
        </div>

        <button className="action-button my-4 w-full sm:w-auto" type="submit">
          Submit request
        </button>
      </form>
    </div>
  );
};

export default CreateDonation;
