import { BiDonateBlood } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Stats = () => {
    const myAxios = useAxiosSecure()
    const {data} = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: async() => {
            const { data } = await myAxios("/dashboard-stats")
            return data;
        },
        initialData: {
          totalUsers: 0,
          totalRequests: 0,
          totalFunding: 0,
          usersByRole: [],
          requestsByStatus: [],
          requestsByBloodGroup: [],
        },
    })
    const cards = [
      {
        label: "Total Users",
        value: data.totalUsers,
        icon: <FaUsers className="h-full w-full" />,
      },
      {
        label: "Donation Requests",
        value: data.totalRequests,
        icon: <BiDonateBlood className="h-full w-full" />,
      },
      {
        label: "Total Funding",
        value: data.totalFunding,
        icon: <GiMoneyStack className="h-full w-full" />,
      },
    ];

    const maxStatus = Math.max(...data.requestsByStatus.map((item) => item.count), 1);
    const maxGroup = Math.max(...data.requestsByBloodGroup.map((item) => item.count), 1);
    const totalRoles = Math.max(data.usersByRole.reduce((sum, item) => sum + item.count, 0), 1);

  return (
    <div className="my-8 space-y-6">
      <div className="grid gap-5 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="metric-card">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-pink-600 p-4 text-white shadow-lg shadow-pink-100">
              {card.icon}
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-300">{card.label}</p>
            <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="brand-panel p-5">
          <h3 className="text-lg font-black text-slate-950 dark:text-white">Requests by status</h3>
          <div className="mt-5 space-y-4">
            {data.requestsByStatus.map((item) => (
              <div key={item._id || "unknown"}>
                <div className="mb-1 flex justify-between text-sm font-bold text-slate-600 dark:text-slate-300">
                  <span className="capitalize">{item._id || "unknown"}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-3 rounded-full bg-rose-100 dark:bg-slate-700">
                  <div className="h-3 rounded-full bg-pink-600" style={{ width: `${(item.count / maxStatus) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="brand-panel p-5">
          <h3 className="text-lg font-black text-slate-950 dark:text-white">Blood group demand</h3>
          <div className="mt-5 flex h-52 items-end gap-3">
            {data.requestsByBloodGroup.map((item) => (
              <div key={item._id || "group"} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-pink-600" style={{ height: `${Math.max((item.count / maxGroup) * 170, 16)}px` }} />
                <span className="text-xs font-black text-slate-600 dark:text-slate-300">{item._id}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="brand-panel p-5">
          <h3 className="text-lg font-black text-slate-950 dark:text-white">Users by role</h3>
          <div className="mt-5 space-y-3">
            {data.usersByRole.map((item) => (
              <div key={item._id || "role"} className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-pink-600" />
                <span className="min-w-24 text-sm font-bold text-slate-700 dark:text-slate-200">{item._id || "Member"}</span>
                <span className="flex-1 rounded-full bg-rose-100 dark:bg-slate-700">
                  <span className="block h-2 rounded-full bg-emerald-500" style={{ width: `${(item.count / totalRoles) * 100}%` }} />
                </span>
                <span className="text-sm font-black text-slate-950 dark:text-white">{item.count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Stats;
