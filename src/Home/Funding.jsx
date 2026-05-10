import React from "react";

const Funding = () => {
  return (
    <div className="min-h px-4">
      <div className="mx-auto my-10 max-w-2xl text-center">
        <h1 className="text-3xl font-black text-slate-950">Support RedLove</h1>
        <p className="mt-3 text-slate-600">
          Help fund donor outreach, emergency matching, and community blood drives.
        </p>
      </div>
      <div className="brand-panel mx-auto max-w-xl p-8 text-center">
        <h2 className="text-xl font-bold text-slate-950">Funding is temporarily unavailable</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Online payments are currently paused while we update the payment setup.
          Donation request and donor matching features are still available.
        </p>
      </div>
    </div>
  );
};

export default Funding;
