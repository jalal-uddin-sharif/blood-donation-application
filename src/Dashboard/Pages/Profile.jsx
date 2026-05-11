import { useState } from "react";
import { FiEdit3, FiMail, FiMapPin, FiSave } from "react-icons/fi";
import { ImSpinner3 } from "react-icons/im";
import Swal from "sweetalert2";
import useDbUser from "../../CustomHooks/useDbUser";
import DistrictUpazila from "../../components/DistrictUpazila";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { imageUpload } from "../../utils";

const Profile = () => {
  const [User, refetch] = useDbUser();
  const myAxios = useAxiosSecure();
  const [update, setUpdate] = useState(false);
  const [bloodGroup, setBloodGroup] = useState(User?.bloodGroup);
  const [district, setDistrict] = useState(User?.district);
  const [upazila, setUpazila] = useState(User?.upazila);
  const [newName, setNewName] = useState(User?.Name);
  const [imageUrl, setImageUrl] = useState(User?.imageUrl);
  const [spin, setSpin] = useState(false);

  const handleImageUpload = async (e) => {
    const image = await imageUpload(e.target.files[0]);
    setImageUrl(image);
  };

  const handleUpdateProfile = async () => {
    setSpin(true);
    const Email = User?.Email;
    const updatedUserData = {
      Name: newName || User?.Name,
      Email,
      district: district || User?.district,
      upazila: upazila || User?.upazila,
      bloodGroup: bloodGroup || User?.bloodGroup,
      Role: User?.Role,
      status: User?.status,
      imageUrl: imageUrl || User?.imageUrl,
    };

    try {
      const data = await myAxios.put(`/update-user-profile/${Email}`, updatedUserData);
      Swal.fire({
        icon: "success",
        title: data.data.modifiedCount > 0 ? "Your profile updated" : "Data up to date",
        showConfirmButton: false,
        timer: 1500,
      });
      setUpdate(false);
      refetch();
    } finally {
      setSpin(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="mb-6">
        <p className="section-kicker">Account</p>
        <h1 className="section-title mt-2">My profile</h1>
        <p className="section-copy">Keep your donor details accurate so the system can match requests correctly.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="brand-section overflow-hidden">
          <div className="h-28 bg-gradient-to-br from-pink-600 to-rose-500" />
          <div className="-mt-12 p-6">
            <img src={imageUrl || User?.imageUrl} alt={User?.Name} className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-lg shadow-rose-100" />
            <h2 className="mt-5 text-2xl font-black text-slate-950">{User?.Name}</h2>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <FiMail className="text-pink-600" />
              {User?.Email}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <FiMapPin className="text-pink-600" />
              {User?.district}, {User?.upazila}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="status-pill bg-pink-100 text-pink-700">{User?.Role}</span>
              <span className="status-pill bg-emerald-100 text-emerald-700">{User?.status}</span>
              <span className="status-pill bg-slate-100 text-slate-700">{User?.bloodGroup}</span>
            </div>
          </div>
        </aside>

        <div className="form-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-950">Profile details</h2>
              <p className="mt-1 text-sm text-slate-500">Review or update your public donor information.</p>
            </div>
            {!update && (
              <button onClick={() => setUpdate(true)} className="soft-button gap-2 px-4 py-2" type="button">
                <FiEdit3 />
                Edit
              </button>
            )}
          </div>

          {!update ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Name", User?.Name],
                ["Email", User?.Email],
                ["Blood Group", User?.bloodGroup],
                ["District", User?.district],
                ["Upazila", User?.upazila],
                ["Role", User?.Role],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-rose-50 p-4">
                  <p className="text-xs font-black uppercase text-slate-400">{label}</p>
                  <p className="mt-1 font-bold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-5">
              <div>
                <label>Name</label>
                <input defaultValue={User?.Name} onChange={(e) => setNewName(e.target.value)} className="brand-input" type="text" placeholder="New name" />
              </div>

              <div>
                <label>Blood Group</label>
                <select defaultValue={User?.bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required className="select select-bordered w-full rounded-xl border-rose-100 bg-white text-slate-700 focus:outline-none">
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <DistrictUpazila district={district || User?.district} setDistrict={setDistrict} setUpazila={setUpazila} upazila={upazila || User?.upazila} defaultValue={User?.district} />

              <div>
                <label htmlFor="fileInput">Upload Image</label>
                <input onChange={handleImageUpload} id="fileInput" accept="image/*" type="file" className="file-input file-input-bordered file-input-primary w-full rounded-xl" />
              </div>

              <button onClick={handleUpdateProfile} className="action-button gap-2" type="button">
                {spin ? (
                  <>
                    Saving <ImSpinner3 className="animate-spin" />
                  </>
                ) : (
                  <>
                    <FiSave /> Save profile
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
