import React from "react";
import CheckOut from "./CheckOut";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const Funding = () => {
  return (
    <div className="min-h">
      <div className="flex justify-center items-center">
        <button className="btn btn-warning my-10">Give Fund</button>
      </div>
      <Elements stripe={stripePromise}>
        <CheckOut />
      </Elements>
    </div>
  );
};

export default Funding;
