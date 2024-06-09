import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { imageUpload } from "../../utils";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import useDbUser from "../../CustomHooks/useDbUser";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  const [User] = useDbUser()
  console.log(User);
  const authorName = User?.Name
  const authorEmail = User?.Email;
  const authorLogo = User?.imageUrl
  const status = "draft";
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleThumbnailChange = async (e) => {
    const thumbnail_url = await imageUpload(e.target.files[0]);
    setThumbnail(thumbnail_url);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const myAxios = useAxiosSecure();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = { title, thumbnail, content, status, authorName, authorEmail, authorLogo };
    const data = await myAxios.post("create-new-blog", blogData);
    console.log(data);
    if (data.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Blog created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      e.target.reset();
    }
  };

  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <label>Title:</label>
          <input
            required
            className="bg-gray-100 px-3 py-2 w-full  outline-none"
            type="text"
            onChange={handleTitleChange}
          />
        </div>

        <div className="my-4 flex flex-col">
          <label htmlFor="">Thumbnail image</label>
          <input
            required
            onChange={handleThumbnailChange}
            type="file"
            accept="image/*"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
        </div>

        <div>
          <label>Content:</label>
          <JoditEditor
            required
            ref={editorRef}
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <button
          className="btn my-8 btn-wide bg-pink-800 text-yellow-300 text-lg tracking-widest hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 "
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
