import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  MdDeleteForever,
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import toast from "react-hot-toast";
import useDbUser from "../../CustomHooks/useDbUser";

const Content = () => {

const [User] = useDbUser()
  const [blogStatus, setBlogStatus] = useState("");
  const myAxios = useAxiosSecure();
  const { data: blogs, refetch} = useQuery({
    queryKey: ["all-blogs", blogStatus],
    queryFn: async () => {
      const blogs = await myAxios(`/all-blogs?status=${blogStatus}`);
      return blogs.data;
    },
  });

  //
  const getPlainText = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    return doc.body.textContent || "";
  };

  const handleStatus = async (id, status) => {
    const { data } = await myAxios.patch(
      `/update-blog-status/${id}?status=${status}`
    );
    if(data._id){
      toast.success(`blog status change to ${status}`)
    }
    refetch()
  };

  const handlefilter = e =>{
    setBlogStatus(e.target.value)
  }

  const handleDelete = async(id)=>{
    const {data} = await myAxios.delete(`/delete-blog/${id}`)
    if(data.deletedCount > 0){
      toast.success("blog deleted")
    }
    refetch()
  }
  return (
    <div>
      <div className="w-full flex justify-end">
        <Link
          to={"/dashboard/content-management/add-blog"}
          className="btn btn-primary btn-wide"
        >
          Add blog
        </Link>
      </div>
      <section className="mt-12 mx-auto px-4 max-w md:px-8">
        <div className="text-center">
          <h1 className="text-3xl text-gray-800 font-semibold">Blog</h1>
          <p className="mt-3 text-gray-500">
            Blogs that are loved by the community. Updated every hour.
          </p>
        </div>
        <div>
        <select onChange={handlefilter} className="select select-info w-full max-w-xs mt-6">
          <option disabled selected>
            Filter by
          </option>
          <option value={""}>All</option>
          <option value={"published"}>Published</option>
          <option value={"draft"}>Draft</option>
        </select>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ">
          {blogs?.map((items, key) => (
            <article
              className={`max-w-md mx-auto mt-4 shadow-lg border  p-2 rounded-md duration-300 hover:shadow-sm ${
                items.status === "draft" ? "bg-red-300" : "bg-gray-100"
              }`}
              key={key}
            >
              <a href={items.href}>
                <img
                  src={items.thumbnail}
                  loading="lazy"
                  alt={items.title}
                  className="w-full h-48 rounded-t-md"
                />
                <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                  <div className="flex-none w-10 h-10 rounded-full">
                    <img
                      src={items.authorLogo}
                      className="w-full h-full rounded-full"
                      alt={items.authorName}
                    />
                  </div>
                  <div className="ml-3">
                    <span className="block text-gray-900">
                      {items.authorName}
                    </span>
                    <span className="block text-gray-400 text-sm">
                      {items.date}
                    </span>
                  </div>
                </div>
                <div className="pt-3 ml-4 mr-2 mb-3">
                  <h3 className="text-xl text-gray-900">{items.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {getPlainText(items.content).substring(0, 200)}...
                  </p>
                </div>
                
                  <div className="px-4 flex items-center  justify-between">
                  <h1>Blog Status: {items.status} </h1>
{
                  User?.Role === "Admin" && 
                  <div className="flex gap-1">
                      {items.status === "draft" ? (
                    <button
                      onClick={() => handleStatus(items._id, "published")}
                      title="click for published"
                      className="btn btn-circle"
                    >
                      <MdOutlinePublishedWithChanges color="green" size={25} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatus(items._id, "draft")}
                      title="click for unpublished"
                      className="btn btn-circle bg-white"
                    >
                      <MdOutlineUnpublished color="red" size={25} />
                    </button>
                  )}
                  <button onClick={()=>handleDelete(items._id)} title="delete blog" className={`btn btn-circle ${items.status === "draft"? "bg-gray-50 text-red-700" : "bg-red-200"}`}><MdDeleteForever color=""  size={25} /></button>
                  </div>
                }
                </div>
                
                
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Content;
