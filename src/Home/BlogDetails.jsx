import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const BlogDetails = () => {
    const {id} = useParams()
    const myAxios = useAxiosSecure()
    const {data: blogData} = useQuery({
        queryKey: ["blogsDetails"],
        queryFn: async () =>{
            const {data} = await myAxios(`/blog-details/${id}`)
            return data;
        }
    })
    return (
        
             <div className="min-h bg-gray-100 flex justify-center items-center p-4 my-10">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        <img className="w-full h-64 object-cover" src={blogData?.thumbnail} alt={blogData?.title} />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{blogData?.title}</h1>
          <div className="flex items-center mb-6">
            <img className="w-10 h-10 rounded-full mr-4" src={blogData?.authorLogo} alt={blogData?.authorName} />
            <div>
              <p className="text-gray-900 leading-none">{blogData?.authorName}</p>
              
            </div>
          </div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blogData?.content }}></div>
        </div>
      </div>
    </div>
       
    );
};

export default BlogDetails;