import useAuth from "../CustomHooks/useAuth";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DonationRequest from "../components/DonationRequest";
import WelcomeSection from "../components/WelcomeSection";
import useDbUser from "../CustomHooks/useDbUser";
import Stats from "../components/Stats";
import Loader from "../components/Loader";
const DashboardHome = () => {
  const [User] = useDbUser();
  const { user } = useAuth();
  const email = user?.email;
  const myAxios = useAxiosSecure();
  const { data, isLoading , refetch} = useQuery({
    queryFn: () => getDonationData(),
    queryKey: ["recentDonation", email],
  });

  const getDonationData = async () => {
    const { data } = await myAxios(`my-recent-donation/${email}`);
    return data;
  };
  if(isLoading){
    return <Loader/>
  }
  return (
    <div>
      <div className="brand-panel my-10 flex min-h-28 items-center justify-center p-6">
        <WelcomeSection User={User} />
      </div>
      {
        User?.Role === "Donor" && 
        <div>
        <DonationRequest data={data} viewAll={true} refetch={refetch}/>
      </div>
      }
      {
        User?.Role === "Admin" &&
        <Stats/>
      }
      {
        User?.Role === "Volunteer" &&
        <Stats/>
      }
      
    </div>
  );
};

export default DashboardHome;
