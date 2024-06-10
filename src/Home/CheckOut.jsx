import React, { useMemo } from "react";
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import useResponsiveFontSize from "../../useResponsiveFontSize";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {    
          },
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const CheckOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    });
    console.log("[PaymentMethod]", payload);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto border p-6">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Card number
        </label>
        <div className="border rounded p-2">
          <CardNumberElement
            options={options}
            className="w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Expiration date
        </label>
        <div className="border rounded p-2 bg-gray-50">
          <CardExpiryElement
            options={options}
            className="w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          CVC
        </label>
        <div className="border rounded p-2">
          <CardCvcElement
            options={options}
            className="w-full"
          />
        </div>
      </div>
      <button type="submit" disabled={!stripe} className="btn btn-primary btn-wide text-white font-bold py-2 px-4 rounded" style={{ transition: 'all .15s ease' }}>
        Pay
      </button>
    </form>
  );
};

export default CheckOut;
