import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../CustomHooks/useAxiosSecure"


export const donationData = async id =>{
    const myAxios = useAxiosSecure()

    const {data} = useQuery({
        queryKey: ['donationdata', id],
        queryFn: async()=> {
            const {data} = await myAxios(`/get-request-data/${id}`)
           
            return data
        }, enabled: !!id
    })


return data;
}


// const data =await myAxios(`/get-request-data/${id}`)
// console.log(data.data);