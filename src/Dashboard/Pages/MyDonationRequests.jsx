import React from 'react';
import DonationRequest from '../../components/DonationRequest';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';
import useAuth from '../../CustomHooks/useAuth';

const MyDonationRequests = () => {
    const {user} = useAuth()
    const email = user?.email
    console.log(email);
    const myAxios = useAxiosSecure()
    const {data}=useQuery({
        queryFn: ()=> getDonationData(),
        queryKey: ['donationrequest']
    })

    const getDonationData = async() =>{
        const {data} = await myAxios(`my-donation-request/${email}`)
        return data;
    }
    return (
        <div>
            <DonationRequest data={data} />
        </div>
    );
};

export default MyDonationRequests;