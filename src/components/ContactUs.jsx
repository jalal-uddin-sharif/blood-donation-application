import { Link } from "react-router-dom";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";

const ContactUs = () => {
  const contactMethods = [
    { icon: <FiMapPin />, contact: "Chittagong, Bangladesh", title: "Coverage" },
    { icon: <FiPhoneCall />, contact: "+880 1572223906", title: "Hotline" },
    { icon: <FiMail />, contact: "Admin@RedLoveUser.com", title: "Email" },
  ];

  return (
    <section className="py-10 lg:py-14">
      <div className="brand-section overflow-hidden">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-slate-950 p-7 text-white sm:p-10">
            <p className="text-sm font-black uppercase text-pink-300">Contact and support</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Need blood urgently or want to help run the network?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Reach out to the RedLove team for support, volunteer coordination, or operational partnership.
            </p>
            <Link to="/register" className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-black text-pink-700 transition hover:bg-rose-50">
              Join the network
            </Link>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-7 lg:p-10">
            {contactMethods.map((item) => (
              <div key={item.title} className="rounded-2xl border border-rose-100 bg-rose-50/70 p-5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-xl text-pink-700">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.contact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
