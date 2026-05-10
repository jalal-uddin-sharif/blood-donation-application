import React from "react";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CiUnlock } from "react-icons/ci";
import { TbLockShare } from "react-icons/tb";

const AllUser = () => {
  const myAxios = useAxiosSecure();
  const { data = [], refetch } = useQuery({
    queryFn: () => getAllUser(),
    queryKey: ["users"],
  });

  const getAllUser = async () => {
    const { data } = await myAxios("/all-users");
    return data;
  };

  const handleRole = async (email, role) => {

    const data = await myAxios.patch(`/update-user-role?email=${email}`, {
      role: role,
    });
    if (data.data.success) {
      toast.success(`Role has been changed to ${role}`);
    }
    refetch();
  };

  const handleAction = async (email, status) => {
    const data = await myAxios.patch(`/update-user-status?email=${email}`, {
      status: status,
    });
    if (data.data.success) {
      toast.success(`User status updated to ${status}`);
    }
    refetch();
  };
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-950">Users</h1>
          <p className="mt-2 text-sm text-slate-500">Manage roles, access, and account status.</p>
        </div>
        <div className="brand-panel overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="border-b border-pink-100 bg-pink-50 font-medium text-slate-700">
              <tr>
                <th className="py-3 px-6">User Info</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Change Role</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 text-slate-600">
              {data?.map((item, idx) => (
                <tr key={idx}>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img
                      src={item.imageUrl}
                      className="h-14 w-14 rounded-full border-2 border-pink-100 object-cover"
                    />
                    <div>
                      <span className="block text-sm font-semibold text-slate-800">
                        {item.Name}
                      </span>
                      <span className="block text-xs text-slate-500">
                        {item.Email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Role}</td>
                  <td className="mx-auto max-w-xs space-y-5">
                    <select
                      defaultValue={"OKK"}
                      onChange={(e) =>
                        handleRole(`${item?.Email}`, e.target.value)
                      }
                      className="block w-full rounded-md border border-pink-100 bg-white p-2 focus:border-pink-400 focus:outline-none focus:ring focus:ring-pink-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                    >
                      <option   value={item.Role}>{item.Role}</option>
                      {item.Role === "Donor" || item.Role === "Admin" ? (
                        <option
                          value={"Volunteer"}
                          className="py-2 leading-none px-3 font-medium text-orange-600 hover:text-orange-600 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Volunteer
                        </option>
                      ) : (
                        ""
                      )}
                      {item.Role === "Donor" || item.Role === "Volunteer" ? (
                        <option
                          value={"Admin"}
                          className="py-2 leading-none px-3 font-medium text-blue-600 hover:text-blue-600 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Admin
                        </option>
                      ) : (
                        ""
                      )}

                      {item.Role === "Admin" || item.Role === "Volunteer" ? (
                        <option
                          value={"Donor"}
                          className="py-2 leading-none px-3 font-medium text-green-400 hover:text-green-400 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Donor
                        </option>
                      ) : (
                        ""
                      )}
                    </select>
                  </td>

                  <td
                    className={`px-6 py-4 whitespace-nowrap font-bold ${
                      item.status === "block"
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="px-6 whitespace-nowrap">
                    {item.status !== "active" ? (
                      <button
                        onClick={() => handleAction(`${item.Email}`, "active")}
                        className="btn btn-circle font-medium text-emerald-600 duration-150 hover:bg-pink-50"
                      >
                        <CiUnlock size={25} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction(`${item.Email}`, "block")}
                        className="btn btn-circle font-medium text-red-600 duration-150 hover:bg-pink-50"
                      >
                        <TbLockShare size={25} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
