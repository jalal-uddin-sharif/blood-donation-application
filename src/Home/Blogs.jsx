import React from "react";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

const Blogs = () => {
 
  const myAxios = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const data = await myAxios("/blogs");
      return data.data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  const getPlainText = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="min-h">
      <section className="page-shell">
        <div>
          <p className="section-kicker">Resource center</p>
          <h1 className="section-title mt-2">Stories & Updates</h1>
          <p className="section-copy">
            Guidance, donor stories, and community updates from RedLove.
          </p>
        </div>
        {data?.length === 0 && (
          <EmptyState title="No published blogs yet" message="Published articles will appear here." />
        )}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((items, key) => (
            <Link to={`/blog-details/${items._id}`}
              className="metric-card overflow-hidden p-0 duration-300 hover:border-pink-300"
              key={key}
            >
                <img
                  src={items.thumbnail}
                  loading="lazy"
                  alt={items.title}
                  className="h-48 w-full object-cover"
                />
                <div className="mt-2 flex items-center px-4 pt-3">
                  <div className="h-10 w-10 flex-none rounded-full">
                    <img
                      src={items.authorLogo}
                      className="h-full w-full rounded-full object-cover"
                      alt={items.authorName}
                    />
                  </div>
                  <div className="ml-3">
                    <span className="block text-sm font-semibold text-slate-900">
                      {items.authorName}
                    </span>
                  </div>
                </div>
                <div className="px-4 pb-5 pt-3">
                  <h3 className="text-xl font-bold text-slate-950">{items.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {getPlainText(items.content).substring(0, 200)}...
                  </p>
                </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
