import React from 'react';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DonationRequest from '../../components/DonationRequest';
import useDbUser from '../../CustomHooks/useDbUser';

const AllBloodDonation = () => {
    const [User] = useDbUser()
    const myAxios = useAxiosSecure()
    const {data, refetch} = useQuery({
        queryKey: ["all-donation"],
        queryFn: async() => {
            const {data} = await myAxios("/all-blood-donation-request")
            return data;
        }
    })
    return (
        <div className="page-shell">
            <div className="mb-6">
                <p className="section-kicker">Operations</p>
                <h1 className="section-title mt-2">All blood donation requests</h1>
                <p className="section-copy">Review every request and update request status according to the current workflow.</p>
            </div>
            <DonationRequest data={data} refetch={refetch} volunteer={User?.Role === "Volunteer" ? true : false}/>
        </div>
    );
};

export default AllBloodDonation;
