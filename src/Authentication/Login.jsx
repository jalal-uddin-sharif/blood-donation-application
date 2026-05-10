import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../CustomHooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
    const {loginUser, loading, setLoading} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await loginUser(data.email.trim().toLowerCase(), data.password);
        Swal.fire({
            icon: "success",
            title: "Successfully Logged",
            showConfirmButton: false,
            timer: 1500
          });
          navigate(location?.state || '/')
    } catch (err) {
      setLoading(false)
      console.error("Firebase login error:", err.code);
        Swal.fire({
          icon: "error",
          title: "Email or Password invalid",
          text: err.code || "Please check your Firebase Auth user and password.",
          showConfirmButton: false,
          timer: 2500
        });
    }
  }

  if(loading){
    return <Loader/>
  }
  // useEffect(()=>{
  //   if(user){
  //     return navigate("/")
  //   }
  // },[])
  return (
    <div className="my-10 flex justify-center px-4">
    <div className="brand-panel w-full max-w-md overflow-hidden">
    <form
        className="space-y-4 px-8 py-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="my-4 text-center text-3xl font-black text-slate-950">Welcome back</h1>
        </div>
        <div>
            <label htmlFor="">Email</label>
          <input placeholder="Your Email" type="email"
            className="brand-input"
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
            className="brand-input"
            {...register("password", {
              required: "Password must be 6 charecter",
              minLength: 6,
            })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <p className="text-red-700" role="alert">Password mustbe 6 charecter</p>}
        </div>
        <div className="py-4">
        <button className="btn btn-primary w-full text-white" type="submit">Login</button>
        <p className="text-sm text-slate-600">haven&apos;t account? <Link className="font-semibold text-pink-600" to={"/register"}>Register</Link></p>
        </div>
      </form>
      <div className="h-3 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500" />
    </div>
    </div>
  );
};

export default Login;
