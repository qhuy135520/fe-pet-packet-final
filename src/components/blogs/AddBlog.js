import { sendRequest } from "@/utils/api";
import { uploadImage } from "@/utils/upload";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddBlog() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
  });

  // async function handleSubmit(e) {
  //     e.preventDefault();
  //     // setLoading(true);
  //     console.log("Blog: ", blog)
  //     try {
  //         if (session) {
  //             const imageUrl = await uploadImage(image);
  //             const formInput = await { ...blog };
  //             formInput["image"] = await imageUrl;

  //             const res = await sendRequest({
  //                 url: `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${session.user.userId}`,
  //                 body: formInput,
  //                 method: "POST",
  //             });

  //             if (res.statusCode === 200) {
  //                 window.location.reload();
  //             }
  //         }
  //     } catch (err) {
  //         console.log(err);
  //     }
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation: Check if title, content, and image are present
    if (!blog.title.trim()) {
      alert("Please enter a title.");
      return;
    }
    if (!blog.content.trim()) {
      alert("Please enter content.");
      return;
    }
    if (!image) {
      alert("Please choose an image.");
      return;
    }

    try {
      if (session) {
        // Upload image and prepare form data
        const imageUrl = await uploadImage(image);
        const formInput = { ...blog, image: imageUrl };

        const res = await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${session.user.userId}`,
          body: formInput,
          method: "POST",
        });

        if (res.statusCode === 200) {
          toast.success("Add blog successfully!");
          router.push("/blogs");
        }
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again later.");
    }
  }

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <h3 className="text-center text-primary">Post your blog</h3>
      <form>
        {/* <div className="form-group">
                    <label htmlFor="title">Tilte</label>
                    <input                        
                        type="text"
                        name="title" // Match property in blog state
                        className="form-control"
                        id="title"
                        placeholder="your title here"
                        value={blog.title} // Bind to state
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        className="form-control"
                        name="content" // Match property in blog state
                        id="content"
                        rows={5}
                        defaultValue={""}
                        value={blog.content} // Bind to state
                        onChange={handleChange}
                        required
                    />
                </div> */}

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            placeholder="Your title here (max 100 characters)"
            value={blog.title}
            onChange={handleChange}
            required
            maxLength={100} // Restrict input to 100 characters
          />
          <small className="form-text text-muted">
            {blog.title.length}/100 characters
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            name="content"
            id="content"
            rows={5}
            placeholder="Write your blog content here (max 5000 characters)"
            value={blog.content}
            onChange={handleChange}
            required
            maxLength={5000} // Restrict input to 5000 characters
          />
          <small className="form-text text-muted">
            {blog.content.length}/5000 characters
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="image">Blog image</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            onChange={(e) => handleFileChange(e)}
            accept="image/*"
          />
          <div>
            {preview && <img src={preview} alt="Preview" width={200} />}
          </div>
        </div>

        <button onClick={handleSubmit} class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
