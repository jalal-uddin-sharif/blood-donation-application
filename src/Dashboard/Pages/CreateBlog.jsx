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
    <div className="page-shell">
      <div className="mb-6">
        <p className="section-kicker">Content management</p>
        <h1 className="section-title mt-2">Add blog</h1>
        <p className="section-copy">Create educational content for donors and publish it after admin review.</p>
      </div>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <label>Title:</label>
          <input
            required
            className="brand-input"
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
            className="file-input file-input-bordered file-input-primary w-full rounded-xl"
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
          className="action-button my-8 w-full sm:w-auto"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
