import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useDbUser = () => {
  const myAxios = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const { data: dbUser, refetch} = useQuery({
    queryFn: async () => {
      const data = await myAxios(`/get-user/${email}`);
      return data.data;
    },
    queryKey: ["user", user?.email],
  });
  return [dbUser, refetch];
};

export default useDbUser;
