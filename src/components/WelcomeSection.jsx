


const WelcomeSection = ({User}) => {


 
  return (
    <div>
      <div className=" text-center  space-y-1">
        <h1 className="text-2xl font-medium">
          Welcome back, <span className="text-green-700">{User?.Name}</span>
        </h1>
        {
          User?.Role === "Donor" &&
        <h2 className="text-lg font-medium">Thank you for your commitment to saving lives.</h2>
        }
        {
          User?.Role === "Volunteer" &&
        <h2>We appreciate your dedication to supporting blood donation efforts.</h2>
        }
        {
          User?.Role === "Admin" &&
        <h2  className="text-lg "> You can manage blood requests, donors, and volunteers here.</h2>
        }
      </div>
    </div>
  );
};

export default WelcomeSection;
