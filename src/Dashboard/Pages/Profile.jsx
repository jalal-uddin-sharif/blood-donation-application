import React, { useEffect, useState } from "react";
import useDbUser from "../../CustomHooks/useDbUser";
import DistrictUpazila from "../../components/DistrictUpazila";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { ImSpinner3 } from "react-icons/im";

import Swal from "sweetalert2";
import { imageUpload } from "../../utils";

const Profile = () => {
  const [User, refetch] = useDbUser();
  console.log(User);
  const myAxios = useAxiosSecure();
  const [update, setUpdate] = useState(false);
  const [bloodGroup, setBloodGroup] = useState(User?.bloodGroup);
  const [district, setDistrict] = useState(User?.district);
  const [upazila, setUpazila] = useState(User?.upazila);
  const [newName, setNewName] = useState(User?.Name);
  const [imageUrl,setImageUrl] = useState(User?.imageUrl)
  // const [newEmail, setNewEmail]= useState(User?.Email)
  const [refresh, setRefresh] = useState(false)

const handleImageUpload = async(e) =>{
  const image = await imageUpload(e.target.files[0])
  setImageUrl(image)
}

  const handleBloodGroup = (e) => {
    setBloodGroup(e.target.value);
  };

  const [spin, setSpin] = useState(false);
  const handleUpdateProfile = async () => {
    setSpin(true);
    const Name = newName;
    const Email = User?.Email;
    const Role = User?.Role;
    const status = User?.status;

    const updatedUserData = {
      Name,
      Email,
      district,
      upazila,
      bloodGroup,
      Role,
      status, imageUrl
    };
    console.log(updatedUserData);
    const data = await myAxios.put(
      `/update-user-profile/${Email}`,
      updatedUserData
    );
    console.log(data.data);
    if (data.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Your profile updated",
        showConfirmButton: false,
        timer: 1500,
      });
      setSpin(false);
      setUpdate(!update);
      refetch()
      setRefresh(!refresh)
    } else {
      Swal.fire({
        icon: "success",
        title: "Data uptodate",
        showConfirmButton: false,
        timer: 1500,
      });
      setSpin(false);
      setUpdate(!update);
    }
  };


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
              <h1 className="font-medium text-lg ">
                {User?.Name} ({" "}
                <span
                  className={`${User?.Role === "Admin" && "text-green-600"} 
              ${User?.Role === "Donor" && "text-red-700"}
              ${User?.Role === "Volunteer" && "text-blue-600"}
              `}
                >
                  {" "}
                  {User?.Role}
                </span>{" "}
                )
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
                    <input
                      onChange={(e) => setNewName(e.target.value)}
                      className="px-3 py-2 w-full rounded-md"
                      type="text"
                      name=""
                      id=""
                      placeholder="New Name"
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
                      defaultValue={User?.district}
                    />
                  </div>
                  <div className="relative flex w-full max-w-sm flex-col gap-1">
                    <label
                      className="w-fit pl-0.5 text-sm text-slate-700 dark:text-slate-300"
                      htmlFor="fileInput"
                    >
                      Upload Image
                    </label>
                    <input
                    onChange={handleImageUpload}
                      id="fileInput"
                      accept="image/*"
                      type="file"
                      className="w-full overflow-clip rounded-xl border border-slate-300 bg-slate-100/50 text-sm text-slate-700 file:mr-4 file:cursor-pointer file:border-none file:bg-slate-100 file:px-4 file:py-2 file:font-medium file:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:file:bg-slate-800 dark:file:text-white dark:focus-visible:outline-blue-600"
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
                  {spin ? (
                    <span className="flex items-center justify-center gap-1">
                      Saving <ImSpinner3 className="animate-spin mt-0.5" />
                    </span>
                  ) : (
                    <span>Save</span>
                  )}
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
