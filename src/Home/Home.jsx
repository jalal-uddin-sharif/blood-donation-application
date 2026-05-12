import React from 'react';
import Banner from '../components/Banner';
import Featured from '../components/Featured';
import ContactUs from '../components/ContactUs';
import { Link } from 'react-router-dom';
import { FiEdit3, FiHelpCircle, FiMail, FiSearch, FiShield, FiTrendingUp, FiUserCheck } from 'react-icons/fi';

const Home = () => {
    const steps = [
        { icon: <FiEdit3 />, title: "Create a request", text: "Submit recipient details, blood group, location, hospital, date, and time." },
        { icon: <FiSearch />, title: "Match donors", text: "Search and filter donors or let admins and volunteers coordinate active requests." },
        { icon: <FiUserCheck />, title: "Track completion", text: "Move each request through pending, in-progress, done, or cancelled states." },
    ];
    const categories = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const faqs = [
        ["Can anyone view request details?", "Yes. Details pages are public so donors can evaluate urgent requests before logging in to take action."],
        ["Who can manage all requests?", "Admins and volunteers can update request status from the protected dashboard."],
        ["Is donor data editable?", "Registered users can update profile image, blood group, district, and upazila from their dashboard profile page."],
    ];

    return (
        <div>
            <Banner/>
            <Featured/>
            <section className="py-8 lg:py-12">
                <div className="grid gap-5 lg:grid-cols-3">
                    <div className="metric-card">
                        <FiTrendingUp className="text-3xl text-pink-600" />
                        <h2 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">Dynamic request board</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Open requests are loaded from the backend with search, filters, sorting, and pagination.</p>
                    </div>
                    <div className="metric-card">
                        <FiShield className="text-3xl text-pink-600" />
                        <h2 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">Secure dashboard</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">JWT protected routes keep donor, volunteer, and admin actions separated by role.</p>
                    </div>
                    <div className="metric-card">
                        <FiMail className="text-3xl text-pink-600" />
                        <h2 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">Stored support messages</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Contact submissions are validated on both client and server before being stored in MongoDB.</p>
                    </div>
                </div>
            </section>
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
            <section className="py-8 lg:py-12">
                <div className="brand-section p-6 sm:p-8 lg:p-10">
                    <p className="section-kicker">Blood groups</p>
                    <h2 className="section-title mt-2">Request categories donors can scan fast.</h2>
                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                        {categories.map((group) => (
                            <Link key={group} to={`/blood-donation-request`} className="rounded-2xl border border-rose-100 bg-rose-50 p-5 text-center text-2xl font-black text-pink-700 transition hover:border-pink-300 dark:border-slate-700 dark:bg-slate-800">
                                {group}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-8 lg:py-12">
                <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <p className="section-kicker">Community proof</p>
                        <h2 className="section-title mt-2">Built around real donor coordination needs.</h2>
                        <p className="section-copy">The application prioritizes practical information: location, hospital, date, time, blood group, and request status.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {["Donor registration", "Volunteer workflow", "Admin reporting"].map((item) => (
                            <div key={item} className="metric-card">
                                <h3 className="text-lg font-black text-slate-950 dark:text-white">{item}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Connected to protected dashboard tools and live backend data.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-8 lg:py-12">
                <div className="brand-section p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center gap-3">
                        <FiHelpCircle className="text-3xl text-pink-600" />
                        <div>
                            <p className="section-kicker">FAQ</p>
                            <h2 className="section-title mt-1">Common questions</h2>
                        </div>
                    </div>
                    <div className="mt-7 grid gap-4">
                        {faqs.map(([question, answer]) => (
                            <details key={question} className="rounded-2xl border border-rose-100 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                                <summary className="cursor-pointer text-lg font-black text-slate-950 dark:text-white">{question}</summary>
                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-8 lg:py-12">
                <div className="brand-section flex flex-col gap-4 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
                    <div>
                        <p className="section-kicker">Call to action</p>
                        <h2 className="section-title mt-2">Ready to join the donor network?</h2>
                        <p className="section-copy">Create a donor profile or explore active requests that need attention today.</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link to="/register" className="action-button">Register</Link>
                        <Link to="/blood-donation-request" className="soft-button">Explore requests</Link>
                    </div>
                </div>
            </section>
            <ContactUs/>
        </div>
    );
};

export default Home;
