"use client";
import { sendRequest } from "@/utils/api";
import calculateAverage from "@/utils/calculateAverage";
import convertEnumToString from "@/utils/convertEnumToString";
import formatDate from "@/utils/formatDate";
import { useEffect, useState } from "react";

export default function ServiceManagement({
  services,
  setReviews,
  setTabServiceDetail,
  setTabService,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(services.length / itemsPerPage)
  );
  const [paginatedData, setPaginatedData] = useState(
    services.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  );

  const [scale, setScale] = useState(true);
  const [filterServices, setFilterServices] = useState(services);

  const [inputName, setInputName] = useState("");

  const handleChangePage = (page) => {
    if (page == totalPages + 1 || page == 0) {
      return;
    } else {
      setCurrentPage(page);
      setPaginatedData(
        filterServices.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      );
    }
  };

  const handleChangeInputName = async (e) => {
    setInputName(e.target.value);
    const filter = await services.filter((item) => {
      return item.name.toLowerCase().startsWith(e.target.value.toLowerCase());
    });
    setFilterServices(filter);
    setTotalPages(Math.ceil(filter.length / itemsPerPage));
    setPaginatedData(filter.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage));
    setCurrentPage(1);
  };
  async function handleFilterClick(status) {
    if (status.length != 0) {
      const filter = await services.filter((item) => {
        return item.status == status;
      });
      setFilterServices(filter);
      setTotalPages(Math.ceil(filter.length / itemsPerPage));
      setPaginatedData(filter.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage));
      setCurrentPage(1);
    } else {
      setFilterServices(services);
      setTotalPages(Math.ceil(services.length / itemsPerPage));
      setPaginatedData(
        services.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage)
      );
      setCurrentPage(1);
    }
  }
  async function handleSortByDate() {
    let sorted = await filterServices.sort(function (a, b) {
      return new Date(a.createAt) - new Date(b.createAt);
    });
    setFilterServices(sorted);
    setTotalPages(Math.ceil(sorted.length / itemsPerPage));
    setPaginatedData(sorted.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage));
    setCurrentPage(1);
  }

  async function handleSortByReview() {
    let sorted = await filterServices.sort(function (a, b) {
      const ratingArrA = a?.review.map((review) => review.rating);
      const ratingAvgA = calculateAverage(ratingArrA);

      const ratingArrB = b?.review.map((review) => review.rating);
      const ratingAvgB = calculateAverage(ratingArrB);
      return ratingAvgA - ratingAvgB;
    });
    setFilterServices(sorted);
    setTotalPages(Math.ceil(sorted.length / itemsPerPage));
    setPaginatedData(sorted.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage));
    setCurrentPage(1);
  }

  function handleResetFilter() {
    setFilterServices(services);
    setTotalPages(Math.ceil(services.length / itemsPerPage));
    setPaginatedData(services.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage));
    setCurrentPage(1);
    setInputName("");
  }
  async function handleFilterCategoryClick(id) {
    const filter = await services.filter((item) => {
      return item.serviceCategory.serviceCategoryId == id;
    });
    setFilterServices(filter);
    setTotalPages(Math.ceil(filter.length / itemsPerPage));
    setPaginatedData(filter.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage));
    setCurrentPage(1);
  }

  async function handleViewDetail(id) {
    await services.forEach((item) => {
      if (item.serviceId == id) {
        setReviews(item.review);
      }
    });
    setTabService(false);
    setTabServiceDetail(true);
  }

  async function handleBlockService(id) {
    try {
      setLoading(true);
      const resService = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/services-management/block-service/${id}`,
        method: "PUT",
      });
      if (resService) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Services Management
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search.."
            name="inputName"
            value={inputName}
            onChange={(e) => handleChangeInputName(e)}
          />
          <button type="button">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      <div className="manage-service-filter d-flex justify-content-center mb-5">
        <div className="filter-container">
          <div className="filter-item">
            <span onClick={() => handleFilterClick("active")}>Active</span>
          </div>
          <span className="hyphen-seperator">-</span>
          <div className="filter-item">
            <span onClick={() => handleFilterClick("inactive")}>Inactive</span>
          </div>
          <span className="hyphen-seperator">-</span>
          <div className="filter-item">
            <span onClick={() => handleFilterClick("")}>All</span>
          </div>
          <span className="seperator"></span>
          <div className="filter-item " id="statuses">
            <span className="" onClick={() => setScale(!scale)}>
              Category Type
            </span>
          </div>
          <span className="seperator"></span>
          <div className="filter-item " id="statuses">
            <span onClick={() => handleSortByDate()}>Sort By Date</span>
          </div>
          <span className="seperator"></span>
          <div className="filter-item " id="statuses">
            <span onClick={() => handleSortByReview()}>Sort By Review</span>
          </div>
          <span className="seperator"></span>
          <div className="filter-item" id="statuses">
            <i className="fas fa-undo" />
            <span onClick={() => handleResetFilter()}>Reset Filters</span>
          </div>
          <div
            className={`text-center filter-dropdown-content ${
              scale ? "scale" : ""
            }`}
          >
            <span
              onClick={() => handleFilterCategoryClick(1)}
              className={`status-filter-chips `}
            >
              Pet Boarding
            </span>
            <span
              onClick={() => handleFilterCategoryClick(3)}
              className="status-filter-chips"
            >
              Pet Grooming
            </span>
            <span
              onClick={() => handleFilterCategoryClick(4)}
              className="status-filter-chips"
            >
              Pet Walking
            </span>
            <span
              onClick={() => handleFilterCategoryClick(2)}
              className="status-filter-chips"
            >
              Pet Sitting
            </span>
          </div>
        </div>
      </div>
      <div>
        <table className="table table-bordered table-primary text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th className="text-left">Address</th>
              <th>City</th>
              <th>Capacity</th>
              <th>User</th>
              <th>created At</th>
              <th>Updated At</th>
              <th>Average Review</th>
              <th>Total Review</th>
              <th>Status</th>
              <th>View Detail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((service, index) => {
              const ratingArr = service?.review.map((review) => review.rating);
              const ratingAvg = calculateAverage(ratingArr);
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.serviceCategory.name}</td>
                  <td className="text-left">{service.address}</td>
                  <td>{convertEnumToString(service.city)}</td>
                  <td>{service.capacity}</td>
                  <td>
                    {service.user.username} - {service.user.name}
                  </td>
                  <td>{formatDate(service.createAt)}</td>
                  <td>{formatDate(service.updateAt)}</td>
                  <td>
                    <span className="font-weight-bold ">{ratingAvg}</span> Stars
                  </td>
                  <td>{service.review.length}</td>
                  <td className="font-weight-bold text-danger">
                    {service.status.toUpperCase()}
                  </td>
                  <td
                    className="text-info"
                    onClick={() => handleViewDetail(service.serviceId)}
                  >
                    <i className="fa-solid fa-eye"></i> Detail
                  </td>
                  <td>
                    {service.status != "blocked" ? (
                      <button
                        type="button"
                        className="btn btn-danger "
                        onClick={() => handleBlockService(service.serviceId)}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleBlockService(service.serviceId)}
                        className="btn btn-success"
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
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
