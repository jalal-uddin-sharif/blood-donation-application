import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../CustomHooks/useAuth";
import DistrictUpazila from "../../components/DistrictUpazila";
import DatePickerkeep from "../../components/DatePickerkeep";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import useDbUser from "../../CustomHooks/useDbUser";
import { useParams } from "react-router-dom";
import useDonationData from "../../CustomHooks/useDonationData";

const UpdateRequest = () => {
  const id = useParams()
  const {data: donationReqData }= useDonationData(id.id)
  
  const [district, setDistrict] = useState(donationReqData?.district);
  const [upazila, setUpazila] = useState(donationReqData?.upazila);
  const [bloodGroup, setBloodGroup] = useState(donationReqData?.bloodGroup);
  const [error, setError] = useState();
  const [groupError, setGroupError] = useState();
  const [User] = useDbUser()
  



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
    console.log(data);


    if (district === undefined || upazila === undefined) {
      return setError("Address must be required");
    }
  
setError("")
    const requesterName = donationReqData?.requesterEmail;
    const requesterEmail = donationReqData?.requesterEmail
    const recipientName = donationReqData.recipientName;
    const hospital = data.hospital;
    const message = data.message;
    const address = data.address;
    const donatinStatus = donationReqData?.donatinStatus
    const donationDates = donationDate
    const donationTimes = donationTime.toLocaleTimeString()

    const UpdateDonationReqData = {
      requesterName,
      requesterEmail,
      recipientName,
      hospital,
      message,
      address,
      district,
      upazila,
      bloodGroup,
      donatinStatus,
      donationDates,
      donationTimes
    };
    console.log(UpdateDonationReqData);

    // const donationData = await myAxios.post("/new-donation-request", donationReqData)
    // console.log(donationData.data);
    // if(donationData.data.insertedId){
   
    //   Swal.fire({
    //     icon: "success",
    //     title: "Your request submitted",
    //     showConfirmButton: false,
    //     timer: 1500
    //   });   
    //   reset()
    // }
  };

  const handleBloodGroup = (e) => {
    setBloodGroup(e.target.value);
    setGroupError("")
  };



  return (
    <div className="bg-gray-100 rounded-md flex flex-col justify-center items-center">
      <div className="text-center text-green-500 font-bold py-10 text-3xl">
        <h1>Create new donation request</h1>
      </div>
      <form className=" w-4/5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <h1 className="text-lg font-medium ">
            Requester name:{" "}
            <span className="text-pink-600"> {donationReqData?.requesterName} </span>
          </h1>
          <h1 className="text-lg font-medium ">
            Requester email:{" "}
            <span className="text-pink-600"> {donationReqData?.requesterEmail} </span>
          </h1>
        </div>

        <div className="flex gap-5">
          <div className="w-full">
            <label>Recipient Name</label>
            <input
            defaultValue={donationReqData?.recipientName}
              className="outline-none rounded-md mb-2 p-3 w-full"
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
            defaultValue={donationReqData?.bloodGroup}
              onChange={handleBloodGroup}
              required
              className="select select-info select- w-full focus:outline-none bg-gray-50 text-red-500 text-xl"
            >
              
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

        <div>
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
          defaultValue={donationReqData?.hospital}
            className="outline-none rounded-md mb-2 p-3 w-full"
            placeholder="Hospital Name"
            name="HospitalName"
            {...register("hospital", { required: true })}
            aria-invalid={errors.hospital ? "true" : "false"}
          />
          {errors.hospital?.type === "required" && (
            <p className="-mt-2 text-red-700" role="alert">
              Hospital name is required
            </p>
          )}
        </div>
        <div>
          <label>Full Address</label>
          <input
          defaultValue={donationReqData?.address}
            className="outline-none rounded-md mb-2 p-3 w-full"
            placeholder="ex- chittagong,rangunia, padua-rajarhat"
            name="address"
            {...register("address", { required: true })}
            aria-invalid={errors.address ? "true" : "false"}
          />
          {errors.address?.type === "required" && (
            <p className="-mt-2 text-red-700" role="alert">
              address is required
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
          defaultValue={donationReqData?.message}
            className="outline-none rounded-md mb-2 p-3 w-full textarea textarea-bordered"
            placeholder="ex- chittagong,rangunia, padua-rajarhat"
            name="message"
            {...register("message", { required: true })}
            aria-invalid={errors.message ? "true" : "false"}
          />
          {errors.message?.type === "required" && (
            <p className="-mt-2 text-red-700" role="alert">
              Message is required
            </p>
          )}
        </div>

        <button className="btn my-4  btn-success btn-wide" type="submit">
          Submit request
        </button>
      </form>
    </div>
  );
};

export default UpdateRequest;
