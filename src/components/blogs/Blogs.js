"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Blogs({ blogs }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const blogsPerPage = 4; // Number of blogs per page

  // Function to format date to "day-month-year"
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  // Filter blogs based on search query (case-insensitive search)
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort all blogs by createdAt in descending order to get the most recent blog
  const sortedBlogs = filteredBlogs.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Separate the most recent blog from the rest
  const recentBlog = sortedBlogs.length > 0 ? sortedBlogs[0] : null;
  const otherBlogs = sortedBlogs.slice(1);

  // Pagination logic
  const totalPages = Math.ceil(otherBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = otherBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

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

  return (
    <div style={{ marginTop: "7vh" }}>
      {/* Blog Section */}
      <section className="blog-section spad">
        <div className="container">
          <div className="row">
            {/* Content */}
            <div className="col-lg-8">
              {/* Recent Blog */}
              {recentBlog && (
                <div
                  className="blog__item__large"
                  onClick={() => handleBlogClick(recentBlog.blogId)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="blog__item__pic"
                    src={recentBlog.image}
                    alt={recentBlog.image}
                    width={"100%"}
                  />
                  <div className="blog__item__text">
                    <ul className="blog__item__tags">
                      <li>
                        <i className="fa fa-tags" /> Recent post
                      </li>
                    </ul>
                    <h3>
                      <a href="#">{recentBlog.title}</a>
                    </h3>
                    <ul className="blog__item__widget">
                      <li>
                        <i className="fa fa-clock-o" />{" "}
                        {formatDate(recentBlog.createdAt)}
                      </li>
                      <li>
                        <i className="fa fa-user" /> {recentBlog.user.name}
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Blog List */}
              <div className="row">
                {currentBlogs.length > 0 ? (
                  currentBlogs.map((blog) => (
                    <div
                      className="col-lg-6 col-md-6"
                      key={blog.blogId}
                      onClick={() => handleBlogClick(blog.blogId)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="blog__item">
                        <img
                          className="blog__item__pic"
                          src={blog.image}
                          alt={blog.image}
                          width={"100%"}
                        />
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
                {session?.user.role === "ROLE_PROVIDER" && (
                  <button
                    className="btn btn-danger mb-3"
                    onClick={() => router.push("/blogs/manage")}
                  >
                    My blogs
                  </button>
                )}

                {/* Search */}
                <div className="blog__sidebar__search mb-4">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // Reset pagination to page 1
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
