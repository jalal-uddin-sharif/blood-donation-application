import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";

const useDonationData = (id) => {
  const myAxios = useAxiosSecure();

  return useQuery({
    queryKey: ['donationdata', id],
    queryFn: async () => {
      const { data } = await myAxios(`/get-request-data/${id}`);
      return data;
    },
    enabled: !!id, 
  });
};

export default useDonationData;
