import React from 'react';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DonationRequest from '../../components/DonationRequest';

const AllBloodDonation = () => {
    const myAxios = useAxiosSecure()
    const {data} = useQuery({
        queryKey: ["all-donation"],
        queryFn: async() => {
            const {data} = await myAxios("/all-blood-donation-request")
            return data;
        }
    })
    return (
        <div>
            <DonationRequest data={data}/>
        </div>
    );
};

export default AllBloodDonation;