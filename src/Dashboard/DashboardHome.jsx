import useAuth from "../CustomHooks/useAuth";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DonationRequest from "../components/DonationRequest";
import WelcomeSection from "../components/WelcomeSection";
import useDbUser from "../CustomHooks/useDbUser";
import Stats from "../components/Stats";
const DashboardHome = () => {
  const [User] = useDbUser();
  const { user } = useAuth();
  const email = user?.email;
  const myAxios = useAxiosSecure();
  const { data } = useQuery({
    queryFn: () => getDonationData(),
    queryKey: ["recentDonation", email],
  });

  const getDonationData = async () => {
    const { data } = await myAxios(`my-recent-donation/${email}`);
    return data;
  };
  return (
    <div>
      <div className="h-28 bg-gray-100 flex justify-center my-10 items-center">
        <WelcomeSection User={User} />
      </div>
      {
        User?.Role === "Donor" && 
        <div>
        <DonationRequest data={data} />
      </div>
      }
      {
        User?.Role !== "Donor" &&
        <Stats/>
      }
      
    </div>
  );
};

export default DashboardHome;
