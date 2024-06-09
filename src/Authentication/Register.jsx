import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DistrictUpazila from "../components/DistrictUpazila";
import useAuth from "../CustomHooks/useAuth";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
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
const {createUser, user, logOut} = useAuth()
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
    const Role = "Donor"
    const Name = data.name;
    const Email = data.email.toLowerCase();
    const image = data.image[0];
    console.log(image);
    const key = import.meta.env.VITE_IMAGEBB_API_KEY;
    const formData = new FormData();
    formData.append("image", image);
    try {
      const { data } = await axios.post(
        `
        https://api.imgbb.com/1/upload?key=${key}
        `,
        formData
      );
      const imageUrl = data.data.display_url

      createUser(Email, password)
      .then( async res => {
        logOut()
        Swal.fire({
          icon: "success",
          title: "Your account has been created",
          showConfirmButton: false,
          timer: 1500
        });
        updateProfile(res.user,{
          displayName: Name,
          photoURL: imageUrl
        })

        const status = "active"
        const userData = {Name, Email, district, upazila, imageUrl , bloodGroup, status, Role }
  
        const result =await myAxios.post(`/all-users`, userData)
        console.log(result.data);
        
      })
      .catch(err => 
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email already exist, try with new email"
        }),
        setSpinner(false)
      )

    } catch (error) {
      console.log(error);
    }

  };
  if(upazila?.length > 0 && !stop){
    setStop(true)
    return setError(undefined)
  }

  const handleBloodGroup = e =>{
    setGroupError(undefined)
    setBloodGroup(e.target.value)
  }

  useEffect(()=>{
    if(user){
      return navigate("/login")
    }
  },[user])
 
  return (
    <div className="flex justify-center my-10">
      <div className="rounded-md w-2/4 bg-cover bg-no-repeat bg-gray-100">
        <div>
          <h1 className="text-center text-3xl my-4">Register new account</h1>
        </div>
        <form className="p-8 space-y-2 " onSubmit={handleSubmit(onSubmit)}>
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

          <div>
            <label>Email</label>
            <input type="email"
              className="outline-none rounded-md mb-2 py-2 px-3 w-full"
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
            <input type="file" className="file-input file-input-bordered file-input-accent w-full mt-0.5 mb-2"
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
            <select onChange={handleBloodGroup} required className="select select-info w-full focus:outline-none bg-gray-50 text-red-500 text-xl">
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
              className="outline-none rounded-md mb-2 py-2 px-3 w-full"
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
              className="outline-none rounded-md mb-2 py-2 px-3 w-full"
              placeholder="Confirm Password"
              {...register("ConfirmPassword", { required: true, minLength: 6 })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {password !== confirmPassword & confirmPassword?.length > 0 ? 
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

          <button className="btn btn-primary w-full" type="submit">{
            !spinner ? "Submit" : "Please wait"
          }<span className={!spinner ? "hidden" : "animate-spin"}><ImSpinner9 /></span> </button>
        </form>
        <svg className="rounded-b-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
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
