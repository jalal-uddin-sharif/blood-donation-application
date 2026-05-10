import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader';

const BlogDetails = () => {
    const {id} = useParams()
    const myAxios = useAxiosSecure()
    const {data: blogData, isLoading} = useQuery({
        queryKey: ["blogsDetails"],
        queryFn: async () =>{
            const {data} = await myAxios(`/blog-details/${id}`)
            return data;
        }
    })
    if (isLoading) return <Loader />;

    return (
        
             <div className="min-h my-10 flex items-center justify-center p-4">
      <article className="brand-panel w-full max-w-4xl overflow-hidden">
        <img className="h-72 w-full object-cover" src={blogData?.thumbnail} alt={blogData?.title} />
        <div className="p-6 sm:p-8">
          <h1 className="mb-4 text-3xl font-black text-slate-950">{blogData?.title}</h1>
          <div className="flex items-center mb-6">
            <img className="mr-4 h-10 w-10 rounded-full object-cover ring-2 ring-pink-100" src={blogData?.authorLogo} alt={blogData?.authorName} />
            <div>
              <p className="leading-none text-slate-900">{blogData?.authorName}</p>
              
            </div>
          </div>
          <div className="prose max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: blogData?.content }}></div>
        </div>
      </article>
    </div>
       
    );
};

export default BlogDetails;
