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
    <div className="page-shell flex justify-center">
    <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-rose-100 bg-white shadow-xl shadow-rose-100/80 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase text-pink-300">RedLove access</p>
          <h1 className="mt-4 text-4xl font-black leading-tight">Manage blood requests with confidence.</h1>
          <p className="mt-4 text-sm leading-7 text-slate-300">Login to access donor actions, admin controls, volunteer workflow, and request tracking.</p>
        </div>
        <div className="rounded-3xl bg-white/10 p-5 text-sm leading-7 text-slate-200">
          Secure access is powered by Firebase Auth and role-based permissions from the RedLove server.
        </div>
      </div>
    <form
        className="space-y-4 px-6 py-8 sm:px-10 lg:py-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="text-3xl font-black text-slate-950">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">Enter your account credentials to continue.</p>
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
        <button className="action-button w-full" type="submit">Login</button>
        <p className="mt-4 text-sm text-slate-600">No account yet? <Link className="font-semibold text-pink-600" to={"/register"}>Register</Link></p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
