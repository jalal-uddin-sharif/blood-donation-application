import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { imageUpload } from "../../utils";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
const status = "draft"
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleThumbnailChange = async (e) => {
        const thumbnail_url = await imageUpload(e.target.files[0])
       setThumbnail(thumbnail_url)
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const myAxios = useAxiosSecure()
  const handleSubmit = async() => {
    const blogData = {title, thumbnail, content, status}
    const data = await myAxios.post("create-new-blog", blogData)
    console.log(data);
  };

  return (
    <div>
      <h2>Add Blog</h2>
      <div>
        <div className="flex flex-col ">
          <label>Title:</label>
          <input
            className="bg-gray-100 px-3 py-2 w-full  outline-none"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="my-4 flex flex-col"> 
            <label htmlFor="">Thumbnail image</label>
          <input
            onChange={handleThumbnailChange}
            type="file"  accept="image/*"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
        </div>

        <div>
          <label>Content:</label>
          <JoditEditor
            ref={editorRef}
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <button onClick={handleSubmit} className="btn " type="submit">Create</button>
      </div>
    </div>
  );
};

export default CreateBlog;
