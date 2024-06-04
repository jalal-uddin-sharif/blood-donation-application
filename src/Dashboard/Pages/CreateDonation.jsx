import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../CustomHooks/useAuth";
import DistrictUpazila from "../../components/DistrictUpazila";
import DatePickerkeep from "../../components/DatePickerkeep";

const CreateDonation = () => {
  const { user } = useAuth();
  const [district, setDistrict] = useState();
  const [upazila, setUpazila] = useState();
  const [bloodGroup, setBloodGroup] = useState();
  const [error, setError] = useState();
  const [groupError, setGroupError] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const handleBloodGroup = (e) => {
    setGroupError(undefined);
    setBloodGroup(e.target.value);
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
            <span className="text-pink-600"> {user?.displayName} </span>
          </h1>
          <h1 className="text-lg font-medium ">
            Requester email:{" "}
            <span className="text-pink-600"> {user?.email} </span>
          </h1>
        </div>

        <div className="flex gap-5">
          <div className="w-full">
            <label>Recipient Name</label>
            <input
              className="outline-none rounded-md mb-2 p-3 w-full"
              placeholder="Recipient Name"
              name="RecipientName"
              {...register("recipient-name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.type === "required" && (
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
              className="select select-info select- w-full focus:outline-none bg-gray-50 text-red-500 text-xl"
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
            district={district}
          />
        </div>

        <div>
          <label>Hospital Name</label>
          <input
            className="outline-none rounded-md mb-2 p-3 w-full"
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
            className="outline-none rounded-md mb-2 p-3 w-full"
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
            <DatePickerkeep/>
          </div>
          <div>
          <label>Message</label>
          <textarea
            className="outline-none rounded-md mb-2 p-3 w-full textarea textarea-bordered"
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

        <button className="btn my-4  btn-success btn-wide" type="submit">
          Submit request
        </button>
      </form>
    </div>
  );
};

export default CreateDonation;
