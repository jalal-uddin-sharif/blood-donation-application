import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
  MdUnpublished,
} from "react-icons/md";

const Content = () => {
  const posts = [
    {
      title: "What is SaaS? Software as a Service Explained",
      content:
        "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people what they did for their anxiety, and some",

      thumbnail:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      authorLogo: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      authorName: "Sidi dev",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "A Quick Guide to WordPress Hosting",
      content:
        "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations about Whittington will be featured in the film",

      thumbnail:
        "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      authorLogo: "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg",
      authorName: "Micheal",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "7 Promising VS Code Extensions Introduced in 2022",
      content:
        "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks. I realized today that I have all this stuff that",

      thumbnail:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      authorLogo: "https://randomuser.me/api/portraits/men/46.jpg",
      authorName: "Luis",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
      content:
        "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational microlensing was used to observe the",

      thumbnail:
        "https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      authorLogo: "https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg",
      authorName: "Lourin",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
  ];

  const [blogStatus, setBlogStatus] = useState("");
  const myAxios = useAxiosSecure();
  const { data: blogs} = useQuery({
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
  };

  const handlefilter = e =>{
    console.log(e.target.value);
    setBlogStatus(e.target.value)
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
