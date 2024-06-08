import React, { useState, useEffect } from "react";
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
  const { id } = useParams();
  const { data: donationReqData } = useDonationData(id);
const myAxios = useAxiosSecure()
  
  const [districts, setDistrict] = useState();
  const [upazilas, setUpazila] = useState();
  const [bdgroup, setBloodGroup] = useState();
  const [error, setError] = useState();
  const [groupError, setGroupError] = useState();
  const [User] = useDbUser();
  
  const [donationDate, setDonationDate] = useState(new Date().toLocaleDateString());
  const [donationTime, setDonationTime] = useState(new Date());
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      recipientName: donationReqData?.recipientName,
      hospital: donationReqData?.hospital,
      address: donationReqData?.address,
      message: donationReqData?.message,
    }
  });

  useEffect(() => {
    reset({
      recipientName: donationReqData?.recipientName,
      hospital: donationReqData?.hospital,
      address: donationReqData?.address,
      message: donationReqData?.message,
    });
  }, [donationReqData, reset]);

  const onSubmit = async (data) => {
    if (User.status === "block") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Only active users can create donation requests",
      });
    }

   
      const bloodGroup = bdgroup || donationReqData?.bloodGroup
      const upazila = upazilas || donationReqData?.upazila
      const district = districts || donationReqData?.district
  
  

    console.log(data);
    setError("");
    const recipientName =data.recipientName || donationReqData.recipientName;
    const hospital = data.hospital || donationReqData?.hospital;
    const message = data.message || donationReqData?.message;
    const address = data.address || donationReqData?.address;
    const donatinStatus = donationReqData?.donatinStatus;
    const donationDates = donationDate;
    const donationTimes = donationTime.toLocaleTimeString();

    const UpdateDonationReqData = {
      recipientName,
      hospital,
      message,
      address,
      district,
      upazila,
      bloodGroup,
      donatinStatus,
      donationDates,
      donationTimes,
      
    };

    console.log(UpdateDonationReqData);
    console.log(id);

    const donationData = await myAxios.put(`/update-donation-request/${id}`, UpdateDonationReqData)
    console.log(donationData.data);
    if(donationData.data.success){
      Swal.fire({
        icon: "success",
        title: "Your request updated",
        showConfirmButton: false,
        timer: 1500
      });   
   
    }
  };

  const handleBloodGroup = (e) => {
    setBloodGroup(e.target.value);
    setGroupError("");
  };

  return (
    <div className="bg-gray-100 rounded-md flex flex-col justify-center items-center">
      <div className="text-center text-green-500 font-bold py-10 text-3xl">
        <h1>Update Donation Request</h1>
      </div>
      <form className="w-4/5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <h1 className="text-lg font-medium ">
            Requester name:{" "}
            <span className="text-pink-600">{donationReqData?.requesterName}</span>
          </h1>
          <h1 className="text-lg font-medium ">
            Requester email:{" "}
            <span className="text-pink-600">{donationReqData?.requesterEmail}</span>
          </h1>
        </div>

        <div className="flex gap-5">
          <div className="w-full">
            <label>Recipient Name</label>
            <input
              className="outline-none rounded-md mb-2 p-3 w-full"
              placeholder="Recipient Name"
              {...register("recipientName", { required: !donationReqData?.recipientName })}
              aria-invalid={errors.recipientName ? "true" : "false"}
            />
            {errors.recipientName && (
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
              <option value={donationReqData?.bloodGroup}>Select blood group</option>
              <option value={"A+"}>A+</option>
              <option value={"A-"}>A-</option>
              <option value={"B+"}>B+</option>
              <option value={"B-"}>B-</option>
              <option value={"AB+"}>AB+</option>
              <option value={"AB-"}>AB-</option>
              <option value={"O+"}>O+</option>
              <option value={"O-"}>O-</option>
            </select>
            {groupError && (
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
            district={districts}
          />
          {error && (
            <p className="text-red-700" role="alert">
              {error}
            </p>
          )}
        </div>

        <div>
          <label>Hospital Name</label>
          <input
            className="outline-none rounded-md mb-2 p-3 w-full"
            placeholder="Hospital Name"
            {...register("hospital", { required: !donationReqData?.hospital })}
            aria-invalid={errors.hospital ? "true" : "false"}
          />
          {errors.hospital && (
            <p className="-mt-2 text-red-700" role="alert">
              Hospital Name is required
            </p>
          )}
        </div>
        <div>
          <label>Full Address</label>
          <input
            className="outline-none rounded-md mb-2 p-3 w-full"
            placeholder="ex- chittagong,rangunia, padua-rajarhat"
            {...register("address", { required: !donationReqData?.address })}
            aria-invalid={errors.address ? "true" : "false"}
          />
          {errors.address && (
            <p className="-mt-2 text-red-700" role="alert">
              Address is required
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
            className="outline-none rounded-md mb-2 p-3 w-full textarea textarea-bordered"
            placeholder="Message"
            {...register("message", { required: !donationReqData?.message })}
            aria-invalid={errors.message ? "true" : "false"}
          />
          {errors.message && (
            <p className="-mt-2 text-red-700" role="alert">
              Message is required
            </p>
          )}
        </div>

        <button className="btn my-4 btn-success btn-wide" type="submit">
          Submit request
        </button>
      </form>
    </div>
  );
};

export default UpdateRequest;
