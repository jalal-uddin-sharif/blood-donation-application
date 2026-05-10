import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DistrictUpazila from "../components/DistrictUpazila";
import useAuth from "../CustomHooks/useAuth";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";

const Register = () => {
  const [spinner, setSpinner] = useState(false)
const [district, setDistrict] = useState()
const [upazila, setUpazila] = useState()
const [bloodGroup, setBloodGroup] = useState()
const [error, setError] = useState();
const [groupError, setGroupError] = useState()
const [stop, setStop] = useState(false)
const {createUser, logOut} = useAuth()
const navigate = useNavigate()
const myAxios = useAxiosSecure()

  
  const {
    register,
    formState: { errors },
    handleSubmit, watch
  } = useForm();
  const password = watch("password")
  const confirmPassword = watch("ConfirmPassword")
  const onSubmit = async (data) => {
    setSpinner(true)

    if(bloodGroup === undefined){
      setSpinner(false)
      return setGroupError("Blood group must be required")
    }
    if(district === undefined || upazila === undefined){
      setSpinner(false)
    return  setError("Address must be required")
    }
    if(password !== confirmPassword){
      setSpinner(false)
      return Swal.fire({
        icon: "error",
        title: "Password not matched",
        showConfirmButton: false,
        timer: 1500
      });
    }
    const Role = "Donor"
    const Name = data.name;
    const Email = data.email.trim().toLowerCase();
    const image = data.image[0];
    const key = import.meta.env.VITE_IMAGEBB_API_KEY;
    const formData = new FormData();
    formData.append("image", image);
    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${key}`,
        formData
      );
      const imageUrl = data.data.display_url

      const res = await createUser(Email, password);
      await updateProfile(res.user,{
        displayName: Name,
        photoURL: imageUrl
      })

      const status = "active"
      const userData = {Name, Email, district, upazila, imageUrl , bloodGroup, status, Role }

      await myAxios.post(`/all-users`, userData)
      await logOut()
      Swal.fire({
        icon: "success",
        title: "Your account has been created",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/login")

    } catch (error) {
      console.error("Registration error:", error.code || error.message);
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: error.code || error.message || "Please check your Firebase and ImgBB settings.",
      })
    } finally {
      setSpinner(false)
    }

  };
  useEffect(() => {
    if (upazila?.length > 0 && !stop) {
      setStop(true)
      setError(undefined)
    }
  }, [upazila, stop])

  const handleBloodGroup = e =>{
    setGroupError(undefined)
    setBloodGroup(e.target.value)
  }

  return (
    <div className="my-10 flex justify-center px-4">
      <div className="brand-panel w-full max-w-2xl overflow-hidden bg-cover bg-no-repeat">
        <div>
          <h1 className="my-6 text-center text-3xl font-black text-slate-950">Register new account</h1>
        </div>
        <form className="space-y-3 p-8" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Your Name</label>
            <input
              className="brand-input mb-2"
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

          <div>
            <label>Email</label>
            <input type="email"
              className="brand-input mb-2"
              placeholder="Enter your email"
              {...register("email", { required: "Email Address is required" })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="-mt-2 text-red-700" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="">Profile photo</label> <br />
            <input type="file" className="file-input file-input-bordered file-input-primary mt-0.5 mb-2 w-full"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <p className="mt-1 text-red-700" role="alert">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="">Blood Group</label>
            <select onChange={handleBloodGroup} required className="select select-primary w-full bg-white text-pink-600 focus:outline-none">
              <option disabled selected>
                Select Blood Group
              </option>
              <option value={'A+'}>A+</option>
              <option value={'A-'}>A-</option>
              <option value={'B+'}>B+</option>
              <option value={'B-'}>B-</option>
              <option value={'AB+'}>AB+</option>
              <option value={'AB-'}>AB-</option>
              <option value={'O+'}>O+</option>
              <option value={'O-'}>O-</option>
            </select>
            {
            groupError && (
              <p className="text-red-700" role="alert">
                {groupError}
              </p>
            )
          }
          </div>
          <DistrictUpazila setDistrict={setDistrict} setUpazila={setUpazila} district={district} />
          {
            error && (
              <p className="-mt-2 text-red-700" role="alert">
                {error}
              </p>
            )
          }
          <div>
            <label>Password</label>
            <input type="password"
              className="brand-input mb-2"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="-mt-2 text-red-700" role="alert">
                Password must be 6 charecter
              </p>
            )}
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" 
              className="brand-input mb-2"
              placeholder="Confirm Password"
              {...register("ConfirmPassword", { required: true, minLength: 6 })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {password !== confirmPassword && confirmPassword?.length > 0 ? 
              <p className="-mt-2 text-red-700" role="alert">
                Password not matched
              </p> : ""
            }
            {
              errors.ConfirmPassword && (
                <p className="-mt-2 text-red-700" role="alert">
                Confirm password required
              </p>
              )
            }
          </div>

          <button className="btn btn-primary w-full text-white" type="submit">{
            !spinner ? "Submit" : "Please wait"
          }<span className={!spinner ? "hidden" : "animate-spin"}><ImSpinner9 /></span> </button>
          <p className="text-sm text-slate-600">Already have an account? <Link className="font-semibold text-pink-600" to={"/login"}>Login</Link></p>
        </form>
        <div className="h-3 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500" />
      </div>
    </div>
  );
};

export default Register;
