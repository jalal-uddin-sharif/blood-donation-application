import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useRole = () => {
  const myAxios = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const { data: Role } = useQuery({
    queryFn: async () => {
      const data = await myAxios(`/get-user/${email}`);
      return data.data.Role;
    },
    queryKey: ["user", user?.email],
  });
  return Role;
};

export default useRole;
