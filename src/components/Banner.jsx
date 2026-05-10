import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative my-10 overflow-hidden rounded-lg border border-pink-100 bg-white shadow-sm shadow-pink-100 lg:min-h-[430px]">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
      <div className="order-2 h-72 lg:order-2 lg:h-auto">
        <img
          className="h-full w-full object-cover"
          src="https://etimg.etb2bimg.com/photo/101351521.cms"
          alt="Blood donation volunteers"
        />
      </div>

      <div className="order-1 flex items-center bg-gradient-to-br from-white via-pink-50 to-white">
        <div className="flex flex-col p-8 sm:p-10 lg:p-12">
          <span className="mb-4 w-fit rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-700">
            Donate blood. Find donors. Move fast.
          </span>
          <h2 className="text-3xl font-black uppercase leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Be the Hero: Donate Blood, Save Lives
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Every drop counts. Sign up to be a blood donor and make a
            life-changing difference for someone in need. Find a drive near you,
            learn about eligibility, and join our community of heroes today.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={"/register"}>
            <button className="btn btn-outline border-pink-300 text-pink-700 hover:border-pink-600 hover:bg-pink-600 hover:text-white">Join as donor</button>
            </Link>
            <Link to={'/search-donors'}>
            <button className="btn btn-primary text-white">Search Donors</button>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Banner;
