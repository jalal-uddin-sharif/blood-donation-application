import React from "react";
import useAuth from "../CustomHooks/useAuth";
import DonationRequest from "./DonationRequest";

const WelcomeSection = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <div className="my-10">
        <h1 className="text-lg font-medium">
          Hello, <span className="text-green-700">{user?.displayName}</span>
        </h1>
      </div>

      {/* recent donation */}
      <DonationRequest/>
    </div>
  );
};

export default WelcomeSection;
