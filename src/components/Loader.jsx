import React from "react";

const Loader = () => {
  return (
    <div className="min-h flex justify-center items-center">
      <div className="flex flex-col gap-4 w-60">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
};

export default Loader;
