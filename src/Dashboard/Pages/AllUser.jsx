import React from 'react';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllUser = () => {

    const myAxios = useAxiosSecure()
    const {data} = useQuery({
        queryFn: ()=> getAllUser(),
        queryKey:['users']
    })

    const getAllUser = async () =>{
        const {data} = await myAxios("/all-users")
        console.log(data);
    }
    const tableItems = [
        {
            avatar: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
            name: "Liam James",
            email: "liamjames@example.com",
            phone_nimber: "+1 (555) 000-000",
            position: "Software engineer",
            salary: "$100K"
        },
        
    ]
    return (
        <div>
             <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Team members
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                    <a
                        href="javascript:void(0)"
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add member
                    </a>
                </div>
            </div>
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
                        {
                            tableItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                        <img src={item.avatar} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <span className="block text-gray-700 text-sm font-medium">{item.name}</span>
                                            <span className="block text-gray-700 text-xs">{item.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.phone_nimber}</td>
                                    <td className="px-6 whitespace-nowrap">
                                        <a href="javascript:void()" className="py-2 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Volunteer
                                        </a>
                                        <button href="javascript:void()" className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Admin
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td>
                                    <td className="px-6 whitespace-nowrap">
                                        <a href="javascript:void()" className="py-2 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Active
                                        </a>
                                        <button href="javascript:void()" className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Block
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default AllUser;