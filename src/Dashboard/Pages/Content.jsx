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
    <div className="page-shell">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Content management</p>
          <h1 className="section-title mt-2">Blog library</h1>
          <p className="section-copy">Create, review, publish, draft, and remove educational blog content.</p>
        </div>
        <Link
          to={"/dashboard/content-management/add-blog"}
          className="action-button w-fit"
        >
          Add blog
        </Link>
      </div>
        <div>
        <select onChange={handlefilter} className="select select-bordered mt-8 w-full max-w-xs rounded-xl border-rose-100 bg-white">
          <option disabled selected>
            Filter by
          </option>
          <option value={""}>All</option>
          <option value={"published"}>Published</option>
          <option value={"draft"}>Draft</option>
        </select>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 ">
          {blogs?.map((items, key) => (
            <article
              className={`metric-card overflow-hidden p-0 ${
                items.status === "draft" ? "bg-red-50" : "bg-white"
              }`}
              key={key}
            >
              <a href={items.href}>
                <img
                  src={items.thumbnail}
                  loading="lazy"
                  alt={items.title}
                  className="h-48 w-full object-cover"
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
                    <span className="block font-bold text-gray-900">
                      {items.authorName}
                    </span>
                    <span className="block text-sm text-gray-400">
                      {items.date}
                    </span>
                  </div>
                </div>
                <div className="pt-3 ml-4 mr-2 mb-3">
                  <h3 className="text-xl font-black text-gray-900">{items.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {getPlainText(items.content).substring(0, 200)}...
                  </p>
                </div>
                
                  <div className="flex items-center justify-between px-4 pb-4">
                  <h1 className="status-pill bg-pink-100 text-pink-700">{items.status} </h1>
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
    </div>
  );
};

export default Content;
