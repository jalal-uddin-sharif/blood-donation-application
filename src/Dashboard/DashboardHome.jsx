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
    <div className="page-shell">
      <div className="brand-section p-6 sm:p-8">
        <WelcomeSection User={User} />
      </div>
      {
        User?.Role === "Donor" && 
        <div className="mt-8">
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
