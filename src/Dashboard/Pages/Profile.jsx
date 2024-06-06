import React, { useState } from "react";
import useDbUser from "../../CustomHooks/useDbUser";
import DistrictUpazila from "../../components/DistrictUpazila";

const Profile = () => {
  const User = useDbUser();
  console.log(User);
  const [update, setUpdate] = useState(false);
  const [bloodGroup, setBloodGroup] = useState(User?.bloodGroup)
  const [district, setDistrict] = useState(User?.district) 
  const [upazila, setUpazila] = useState(User?.upazila)
  const [newName, setNewName] = useState(User?.Name)
  const [newEmail, setNewEmail]= useState(User?.Email)

  console.log(district);

  const handleBloodGroup = (e) => {
    setBloodGroup(e.target.value);
  };


  const handleUpdateProfile = () =>{
    const Name = newName;
    const Email = newEmail;
    const Role = User?.Role
    const status = User?.status

    const updatedUserData = {Name, Email, district, upazila, bloodGroup, Role, status }
    console.log(updatedUserData);

  }
  return (
    <div>
      <div className="min-h-[calc(100vh-200px)] flex justify-center items-center">
        <div className="bg-gray-100 w-3/5">
          <div className="text-center  justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#0099ff"
                fill-opacity="1"
                d="M0,288L48,245.3C96,203,192,117,288,85.3C384,53,480,75,576,101.3C672,128,768,160,864,154.7C960,149,1056,107,1152,85.3C1248,64,1344,64,1392,64L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </div>

          <section className="flex px-10 pb-10 -mt-10 gap-10 relative">
            <div>
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={User?.imageUrl} />
                </div>
              </div>
              <h1 className="font-medium text-lg ">{User?.Name} ( <span className={`${User?.Role === "Admin" && "text-green-600"} 
              ${User?.Role === "Donor" && "text-red-700"}
              ${User?.Role === "Volunteer" && "text-blue-600"}
              `} > {User?.Role}</span> )
              </h1>
              <h1 className="font-medium text-sm">{User?.Email}</h1>
            </div>

            <div className="flex-1">
              <div>
                <h1>
                  {" "}
                  Address : {User?.district}, {User?.upazila}
                </h1>
                <h1>Blood Group : {User?.bloodGroup}</h1>
              </div>
              {update && (
                <div className="mt-2 ">
                  <div className="flex gap-2">
                    <input onChange={(e)=> setNewName(e.target.value)}
                      className="px-3 py-2 w-full rounded-md"
                      type="text"
                      name=""
                      id=""
                      placeholder="New Name"
                    />
                    <input onChange={(e)=> setNewEmail(e.target.value)}
                      className="px-3 py-2 w-full rounded-md"
                      type="text"
                      name=""
                      id=""
                      placeholder="New Email"
                    />
                  </div>
                  <div className="w-2/3">
                    <label htmlFor="">Blood Group</label>
                    <select
                      defaultValue={User?.bloodGroup}
                      onChange={handleBloodGroup}
                      required
                      className="select select-info w-full focus:outline-none bg-gray-50 text-red-500 text-xl"
                    >
                      <option value={"A+"}>A+</option>
                      <option value={"A-"}>A-</option>
                      <option value={"B+"}>B+</option>
                      <option value={"B-"}>B-</option>
                      <option value={"AB+"}>AB+</option>
                      <option value={"AB-"}>AB-</option>
                      <option value={"O+"}>O+</option>
                      <option value={"O-"}>O-</option>
                    </select>
                  </div>
                  <div className="my-4">
                    <DistrictUpazila
                      district={district || User?.district}
                      setDistrict={setDistrict}
                      setUpazila={setUpazila}
                      upazila={upazila || User?.upazila}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              {!update ? (
                <button
                  onClick={() => setUpdate(!update)}
                  className="btn btn-primary absolute end-3 bottom-1"
                >
                  Update Profile
                </button>
              ) : (
                <button
                  onClick={handleUpdateProfile}
                  className="btn btn-primary absolute end-3 bottom-1"
                >
                  Save
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
