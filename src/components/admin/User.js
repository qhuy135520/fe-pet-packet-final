import React, { useEffect, useState } from "react";
import { sendRequest } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import formatDate from "@/utils/formatDate";

export default function User() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(null);
  const [paginatedData, setPaginatedData] = useState(null);
  const [inputName, setInputName] = useState("");
  const [filterUser, setFilterUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const resUsers = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
        });
        setUsers(resUsers.data);
        setTotalPages(Math.ceil(resUsers.data.length / itemsPerPage));
        setFilterUser(resUsers.data);

        setPaginatedData(
          resUsers.data.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const endpoint =
        currentStatus === "BANNED"
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/unblock/${userId}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/block/${userId}`;

      const response = await sendRequest({
        url: endpoint,
        method: "PUT",
      });

      if (response?.statusCode === 200) {
        toast.success(
          currentStatus === "banned"
            ? "User unbanned successfully!"
            : "User banned successfully!"
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        // Optionally, refresh the user list or update state dynamically
      } else {
        console.error("Error updating user:", response.message);
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Failed to update user status. Please try again.");
    }
  };

  const handleChangePage = (page) => {
    if (page == totalPages + 1 || page == 0) {
      return;
    } else {
      setCurrentPage(page);
      setPaginatedData(
        filterUser.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      );
    }
  };

  const handleChangeInputName = (e) => {
    setInputName(e.target.value);
  };
  const handleFilterUser = async (e) => {
    e.preventDefault();
    if (inputName.length == 0) {
      setFilterUser(users);
      setPaginatedData(users);
    } else {
      const filter = await users.filter((item) => {
        return item.name
          .toLocaleLowerCase()
          .startsWith(inputName.toLocaleLowerCase());
      });
      setFilterUser(filter);
      setTotalPages(Math.ceil(filter.length / itemsPerPage));
      setPaginatedData(filter.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage));
      setCurrentPage(1);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div style={{ flex: 1, padding: "20px" }}>
      {/* Top Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          User Management
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search.."
            name="inputName"
            value={inputName}
            onChange={(e) => handleChangeInputName(e)}
          />
          <button type="button" onClick={(e) => handleFilterUser(e)}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      {/* <button
        className="button-56"
        role="button"
        type="button"
        onClick={(e) => (e)}
      >
        Sign Up For User&nbsp;&nbsp;<i className="fa-solid fa-user-plus"></i>
      </button> */}
      <div>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Created At</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((user, index) => (
              <tr key={user.userId}>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{user.status}</td>
                <td>
                  {/* <button
                    type="button"
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => router.push(`/admin/user/${user.userId}`)}
                  >
                    Update
                  </button> */}
                  <button
                    type="button"
                    onClick={() => toggleUserStatus(user.userId, user.status)}
                    className={`btn btn-sm ${
                      user.status === "BANNED" ? "btn-success" : "btn-danger"
                    }`}
                  >
                    {user.status === "BANNED" ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li
              className={`page-item`}
              onClick={() => handleChangePage(currentPage - 1)}
            >
              <a
                className={`page-link ${
                  currentPage === 1 ? "disabled active-page" : ""
                }`}
                href="#"
                tabIndex="-1"
              >
                Previous
              </a>
            </li>
            {Array.from({ length: totalPages }).map((_, i) => {
              return (
                <li
                  style={{ cursor: "pointer" }}
                  key={i}
                  className={` page-item `}
                  onClick={() => handleChangePage(i + 1)}
                >
                  <a
                    className={`page-link ${
                      currentPage === i + 1 ? "disabled active-page" : ""
                    }`}
                  >
                    {i + 1}
                  </a>
                </li>
              );
            })}

            <li
              onClick={() => handleChangePage(currentPage + 1)}
              className={`page-item`}
            >
              <a
                className={`page-link ${
                  currentPage === totalPages ? "disabled active-page" : ""
                }`}
                href="#"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
