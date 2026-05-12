import { FiActivity, FiShield, FiUsers } from "react-icons/fi";

const About = () => {
  const values = [
    { icon: <FiActivity />, title: "Fast coordination", text: "Requests are organized by blood group, date, time, hospital, and location so donors can act quickly." },
    { icon: <FiShield />, title: "Role-based safety", text: "Admins and volunteers control operational data while donors manage only their own requests and profiles." },
    { icon: <FiUsers />, title: "Community driven", text: "The platform supports donors, recipients, volunteers, and organizers working from one shared workflow." },
  ];

  return (
    <section className="page-shell min-h">
      <div className="brand-section overflow-hidden">
        <div className="bg-slate-950 p-7 text-white sm:p-10">
          <p className="text-sm font-black uppercase text-pink-300">About RedLove</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight">A practical blood donation platform for urgent local response.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            RedLove helps Bangladesh-based communities publish blood requests, discover nearby donors, and monitor each request until it is completed.
          </p>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-3 sm:p-7 lg:p-10">
          {values.map((item) => (
            <article key={item.title} className="metric-card">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-pink-600 text-xl text-white">{item.icon}</span>
              <h2 className="mt-5 text-xl font-black text-slate-950 dark:text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
