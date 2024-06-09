import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative flex flex-col items-center  lg:flex-row-reverse my-10">
      {/* Image Column */}
      <div className="w-full h-64 lg:w-1/2 lg:h-auto">
        <img
          className="h-full w-full object-cover"
          src="https://etimg.etb2bimg.com/photo/101351521.cms"
          alt="Winding mountain road"
        />
      </div>
      {/* Close Image Column */}

      {/* Text Column */}
      <div className="max-w-lg bg-white md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">
        {/* Text Wrapper */}
        <div className="flex flex-col p-12 md:px-16">
          <h2 className="text-2xl font-medium uppercase text-green-800 lg:text-4xl">
            Be the Hero: Donate Blood, Save Lives
          </h2>
          <p className="mt-4">
            Every drop counts. Sign up to be a blood donor and make a
            life-changing difference for someone in need. Find a drive near you,
            learn about eligibility, and join our community of heroes today.
          </p>
          {/* Button Container */}
          <div className="mt-8 flex gap-3">
            <Link to={"/register"}>
            <button className="btn btn-outline">Join as donor</button>
            </Link>
            <Link to={'/search-donors'}>
            <button className="btn btn-primary">Search  Donors</button>
            </Link>
          </div>
        </div>
        {/* Close Text Wrapper */}
      </div>
      {/* Close Text Column */}
    </div>
  );
};

export default Banner;
