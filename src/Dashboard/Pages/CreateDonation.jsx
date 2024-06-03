import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../CustomHooks/useAuth";

const CreateDonation = () => {
    const {user} = useAuth()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className="bg-gray-100 rounded-md">
        <div className="text-center text-green-500 font-bold py-10 text-3xl">
            <h1>Create new donation request</h1>
        </div>
      <form className=" px-8 w-3/5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
            <h1 className="text-lg font-medium ">Requester name: <span className="text-pink-600"> {user.displayName} </span></h1>
            <h1 className="text-lg font-medium ">Requester email: <span className="text-pink-600"> {user.email} </span></h1>
        </div>
        <div>
            <label>Your Name</label>
            <input
              className="outline-none rounded-md mb-2 py-2 px-3 w-full"
              placeholder="Your Name"
              name="Name"
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.type === "required" && (
              <p className="-mt-2 text-red-700" role="alert">
            Name is required
              </p>
            )}
          </div>


        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateDonation;
