import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../CustomHooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {loginUser, setUser, user} = useAuth()
    const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    loginUser(data.email, data.password)
    .then(res => {
        console.log(res.user);
        Swal.fire({
            icon: "success",
            title: "Successfully Logged",
            showConfirmButton: false,
            timer: 1500
          });
          setUser(res.user)
          navigate("/")
    })
    .catch(err =>{
        console.log(err);
    })
  }
  return (
    <div className="flex justify-center my-10">
    <div className="bg-gray-100 w-2/5 rounded-md">
    <form
        className="space-y-2 px-8 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="text-center font-medium text-3xl text-green-500 my-4">Please Login</h1>
        </div>
        <div>
            <label htmlFor="">Email</label>
          <input placeholder="Your Email" type="email"
            className="w-full px-3 py-2 rounded-md focus:outline-none"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-700" role="alert">Email is required</p>
          )}
        </div>

        <div>
            <label htmlFor="">Password</label>
          <input placeholder="Enter Password" type="password"
            className="w-full px-3 py-2 rounded-md focus:outline-none"
            {...register("password", {
              required: "Password must be 6 charecter",
              minLength: 6,
            })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <p className="text-red-700" role="alert">Password mustbe 6 charecter</p>}
        </div>
        <div className="py-4">
        <button className="btn w-full btn-warning " type="submit">Login</button>
        </div>
      </form>
      <svg className="rounded-b-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00cba9" fill-opacity="1" d="M0,224L34.3,234.7C68.6,245,137,267,206,245.3C274.3,224,343,160,411,133.3C480,107,549,117,617,138.7C685.7,160,754,192,823,176C891.4,160,960,96,1029,69.3C1097.1,43,1166,53,1234,48C1302.9,43,1371,21,1406,10.7L1440,0L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
    </div>
    </div>
  );
};

export default Login;
