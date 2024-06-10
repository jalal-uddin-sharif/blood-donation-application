import React from "react";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CiUnlock } from "react-icons/ci";
import { TbLockShare } from "react-icons/tb";

const AllUser = () => {
  const myAxios = useAxiosSecure();
  const { data, refetch } = useQuery({
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
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">User Info</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Change Role</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {data?.map((item, idx) => (
                <tr key={idx}>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img
                      src={item.imageUrl}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {item.Name}
                      </span>
                      <span className="block text-gray-700 text-xs">
                        {item.Email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Role}</td>
                  <td class="mx-auto max-w-xs space-y-5">
                    <select
                      defaultValue={"OKK"}
                      onChange={(e) =>
                        handleRole(`${item?.Email}`, e.target.value)
                      }
                      class="block w-full p-2 focus:outline-none  rounded-md border-transparent bg-gray-100 focus:border-primary-300 focus:bg-white focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
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
                        ? "text-red-700"
                        : "text-green-500"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="px-6 whitespace-nowrap">
                    {item.status !== "active" ? (
                      <button
                        onClick={() => handleAction(`${item.Email}`, "active")}
                        className=" font-medium text-green-500 hover:text-green-500 duration-150 hover:bg-gray-50 btn btn-circle"
                      >
                        <CiUnlock size={25} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction(`${item.Email}`, "block")}
                        className="font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 btn btn-circle"
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
