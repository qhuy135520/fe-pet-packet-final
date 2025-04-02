"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/utils/api";
import { toast } from "react-toastify";

export default function BlogsManage({ blogs }) {
  const router = useRouter();
  const blogsPerPage = 4;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(
    Math.ceil(blogs.length / blogsPerPage)
  );
  const [currentBlogs, setCurrentBlogs] = useState(
    blogs.slice((currentPage - 1) * totalPages, totalPages * blogsPerPage)
  );

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  function handleChangeInput(e) {
    const inputName = e.target.value;
    if (inputName.length == "") {
      setCurrentBlogs(blogs);
      setTotalPages(Math.ceil(blogs / totalPages));
      setCurrentPage(1);
    } else {
      const filter = logs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterBLogs(filter);
      setTotalPages(Math.ceil(filter / totalPages));
      setCurrentPage(1);
    }
  }

  const handleBlogClick = (slug) => {
    router.push(`/blogs/${slug}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (blogId) => {
    try {
      sendRequest({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}`,
      });
    } catch (error) {
      console.error(error);
    }
    toast.success("Delete blog successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div style={{ marginTop: "7vh" }}>
      {/* Blog Section */}
      <section className="blog-section spad">
        <div className="container">
          <div className="row">
            {/* Content */}
            <div className="col-lg-8">
              {/* Blog List */}
              <div className="row">
                {currentBlogs.length > 0 ? (
                  currentBlogs.map((blog) => (
                    <div
                      className="col-lg-6 col-md-6"
                      key={blog.blogId}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="blog__item">
                        <img
                          className="blog__item__pic"
                          src={blog.image}
                          alt={blog.image}
                          width={"100%"}
                          onClick={() => handleBlogClick(blog.blogId)}
                        />
                        <button
                          className="btn btn-danger mt-2"
                          onClick={() => handleDelete(blog.blogId)}
                        >
                          Delete
                        </button>
                        <div className="blog__item__text">
                          <h5>
                            <a href="#">{blog.title}</a>
                          </h5>
                          <ul className="blog__item__widget">
                            <li>
                              <i className="fa fa-clock-o" />{" "}
                              {formatDate(blog.createdAt)}
                            </li>
                            <li>
                              <i className="fa fa-user" /> {blog.user.name}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <p>No blogs found matching your search.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="blog__pagination text-center mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="btn btn-outline-primary mx-1"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    style={{
                      fontWeight: currentPage === i + 1 ? "bold" : "normal",
                    }}
                    className="btn btn-outline-secondary mx-1"
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="btn btn-outline-primary mx-1"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="blog__sidebar">
                <div className="text-center mb-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => router.push(`/blogs/add`)}
                  >
                    Add Blog
                  </button>
                </div>

                {/* Search */}
                <div className="blog__sidebar__search mb-4">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      onChange={(e) => {
                        handleChangeInput(e);
                      }}
                      className="form-control"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
