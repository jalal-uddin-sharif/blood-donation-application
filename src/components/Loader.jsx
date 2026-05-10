import React from "react";

const Loader = () => {
  return (
    <div className="min-h flex items-center justify-center px-4">
      <div className="brand-panel flex w-full max-w-xs flex-col gap-4 p-5">
        <div className="skeleton h-28 w-full bg-pink-100"></div>
        <div className="skeleton h-4 w-28 bg-pink-100"></div>
        <div className="skeleton h-4 w-full bg-pink-100"></div>
        <div className="skeleton h-4 w-4/5 bg-pink-100"></div>
      </div>
    </div>
  );
};

export default Loader;
