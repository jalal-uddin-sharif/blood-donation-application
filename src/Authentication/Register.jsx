import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import DistrictUpazila from "../components/DistrictUpazila";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    const image = data.image[0];
    const key = import.meta.env.VITE_IMAGEBB_API_KEY;
    console.log(key);
    const formData = new FormData();
    formData.append("image", image);
    try {
      const { data } = await axios.post(
        `
        https://api.imgbb.com/1/upload?key=${key}
        `,
        formData
      );
      console.log(data.data.display_url);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="rounded-md w-2/4 bg-cover bg-no-repeat bg-gray-100">
        <div>
          <h1 className="text-center text-3xl my-4">Register new account</h1>
        </div>
        <form className="p-8 space-y-3 " onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="Name">Your Name</label>
            <input
              className="outline-none rounded-sm mb-2 py-2 px-3 w-full"
              placeholder="Your Name"
              name="Name"
              {...register("Name", { required: true })}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            {errors.firstName?.type === "required" && (
              <p className="-mt-2" role="alert">
                First name is required
              </p>
            )}
          </div>

          <div>
            <label htmlFor="">Email</label>
            <input
              className="outline-none rounded-sm mb-2 py-2 px-3 w-full"
              placeholder="Enter your email"
              {...register("mail", { required: "Email Address is required" })}
              aria-invalid={errors.mail ? "true" : "false"}
            />
            {errors.mail && (
              <p className="-mt-2" role="alert">
                {errors.mail.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="">Profile photo</label> <br />
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
            />
          </div>

          <div>
            <select className="select select-info w-full max-w-xs focus:outline-none">
              <option disabled selected>
                Select Blood Group
              </option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>
          <DistrictUpazila/>

          <button type="submit">Submit</button>
        </form>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fill-opacity="1"
            d="M0,0L48,26.7C96,53,192,107,288,112C384,117,480,75,576,80C672,85,768,139,864,138.7C960,139,1056,85,1152,85.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Register;
