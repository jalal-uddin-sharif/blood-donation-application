import React from 'react';
import Banner from '../components/Banner';
import Featured from '../components/Featured';
import ContactUs from '../components/ContactUs';
import { Link } from 'react-router-dom';
import { FiEdit3, FiSearch, FiUserCheck } from 'react-icons/fi';

const Home = () => {
    const steps = [
        { icon: <FiEdit3 />, title: "Create a request", text: "Submit recipient details, blood group, location, hospital, date, and time." },
        { icon: <FiSearch />, title: "Match donors", text: "Search and filter donors or let admins and volunteers coordinate active requests." },
        { icon: <FiUserCheck />, title: "Track completion", text: "Move each request through pending, in-progress, done, or cancelled states." },
    ];

    return (
        <div>
            <Banner/>
            <Featured/>
            <section className="py-8 lg:py-12">
                <div className="brand-section p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="section-kicker">How it works</p>
                            <h2 className="section-title mt-2">A clear flow for urgent requests.</h2>
                            <p className="section-copy">From a public request board to private dashboard actions, every user role gets only the controls they need.</p>
                        </div>
                        <Link to="/dashboard/create-donation-requests" className="action-button w-fit">Create request</Link>
                    </div>
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={step.title} className="rounded-2xl border border-rose-100 bg-white p-5">
                                <div className="flex items-center gap-3">
                                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-pink-600 text-xl text-white">{step.icon}</span>
                                    <span className="text-sm font-black text-pink-700">Step {index + 1}</span>
                                </div>
                                <h3 className="mt-5 text-xl font-black text-slate-950">{step.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <ContactUs/>
        </div>
    );
};

export default Home;
