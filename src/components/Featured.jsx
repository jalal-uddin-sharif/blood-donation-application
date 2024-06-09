import React from 'react';

const Featured = () => {
    const features = [
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5.25v5.25m0 0L12 12l3-1.5m-3 1.5l3 1.5m-3-1.5v5.25M4.5 15H9M9 7.5V3" />
                </svg>,
            title: "Easy Registration",
            desc: "Sign up with just a few clicks to become a blood donor and help save lives.",
            href: "/register"
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>,
            title: "Find Nearby Donors",
            desc: "Locate nearby donors based on your location to get the blood you need quickly.",
            href: "/find-donors"
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75L12 9l4.5-5.25" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22.5V9" />
                </svg>,
            title: "Secure Donation Process",
            desc: "Ensure your donation process is secure and your personal information is protected.",
            href: "/donate"
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15H9M9 7.5V3m0 4.5l5.25 7.5H18" />
                </svg>,
            title: "Get Involved",
            desc: "Explore opportunities to volunteer or organize blood donation events in your community.",
            href: "/get-involved"
        }
    ]

    return (
        <section className="py-14 bg-gray-100 my-10">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-800 md:px-8">
            <div className="max-w-xl space-y-3">
                <h3 className="text-3xl font-semibold sm:text-4xl">
                    Help Save Lives with Blood Donation
                </h3>
                <p>
                    Every donation counts. Join us in our mission to provide life-saving blood to those in need.
                </p>
            </div>
            <div className="mt-12">
                <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        features.map((item, idx) => (
                            <li key={idx} className="flex gap-x-4">
                                <div className="flex-none w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-lg text-gray-800 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p>
                                        {item.desc}
                                    </p>
                                    <a href={item.href} className="text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1">
                                        Learn more
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </section>
    );
};

export default Featured;