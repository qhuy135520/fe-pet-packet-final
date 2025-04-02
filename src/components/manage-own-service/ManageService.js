import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "@/styles/manage-own-service/manage-service.css";
import formatDate from "@/utils/formatDate";
import Preloder from "../Preloder";
import { useRouter } from "next/navigation";
import FilterBar from "../services/FilterBar";
import { toast } from "react-toastify";
import convertEnumToString from "@/utils/convertEnumToString";
import Link from "next/link";

export default function ManageService({
  services,
  setServices,
  cities,
  serviceCategory,
  petType,
  setServiceId,
  setIndexTab,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(null);
  const [paginatedData, setPaginatedData] = useState(null);

  useEffect(() => {
    setTotalPages(Math.ceil(services.length / itemsPerPage));
    setFilterServices(services);

    setPaginatedData(
      services.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, []);

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

  const [filterServices, setFilterServices] = useState(services);
  const [scale, setScale] = useState(false);
  const [active, setActive] = useState(false);
  const router = useRouter();

  function handleClickServiceDetail(id) {
    router.push(`/manage-own-service/${id}`);
  }

  function handleRedirect(serviceId) {
    setServiceId(serviceId);
    setIndexTab(4);
  }

  async function handleChangeStatus(serviceId) {
    try {
      const resService = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/change-status/${serviceId}`,
        method: "PUT",
      });

      if (resService) {
        window.location.reload();
      } else {
        toast.error(
          <div>
            <strong>Internal Server Error</strong>
          </div>
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (!paginatedData) {
    return <Preloder />;
  }

  return (
    <div className="row w-100 ">
      <div className="col-md-2 position-relative w-100 pt-5 ">
        <FilterBar
          serviceCategories={serviceCategory}
          cities={cities}
          petType={petType}
          filterServices={filterServices}
          setFilterServices={setFilterServices}
          services={services}
          setTotalPages={setTotalPages}
          setPaginatedData={setPaginatedData}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className=" col-md-10">
        <div className="manage-service-filter  d-flex justify-content-center mb-5"></div>
        <div className="table-manage-service table-responsive">
          <table className="table text-center table-success table-striped table-bordered  ">
            <thead>
              <tr>
                <th>#</th>
                <th>Category Type</th>
                <th>Service Name</th>
                <th>Address</th>
                <th>Capacity</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Status</th>
                <th>View Detail</th>
                <th>Change Effect</th>
                <th>Manage Vouchers</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((service, index) => {
                return (
                  <tr key={service.serviceId}>
                    <td>{index + 1}</td>
                    <td>{service.serviceCategory.name}</td>
                    <td>{service.name}</td>
                    <td>{`${service.address}, ${convertEnumToString(
                      service.city
                    )}`}</td>
                    <td>{service.capacity}</td>
                    <td>{formatDate(service.createAt)}</td>
                    <td>{formatDate(service.updateAt)}</td>
                    <td className="text-danger font-weight-bold text-uppercase">
                      {service.status}
                    </td>
                    <td
                      onClick={() =>
                        handleClickServiceDetail(service.serviceId)
                      }
                      className="text-info"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-eye"></i> View Detail
                    </td>

                    {service.status == "active" && (
                      <td>
                        <button
                          type="button"
                          onClick={() => handleChangeStatus(service.serviceId)}
                          className="btn btn-danger"
                        >
                          Inactive
                        </button>
                      </td>
                    )}
                    {service.status == "inactive" && (
                      <td>
                        <button
                          type="button"
                          onClick={() => handleChangeStatus(service.serviceId)}
                          className="btn btn-success"
                        >
                          Active
                        </button>
                      </td>
                    )}
                    {service.status == "blocked" && (
                      <td>
                        <button
                          disabled
                          type="button"
                          className="btn btn-secondary"
                        >
                          Blocked
                        </button>
                      </td>
                    )}
                    <td>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => handleRedirect(service.serviceId)}
                      >
                        Vouchers
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {totalPages === 1 && (
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <a className="page-link" href="#" tabIndex="-1">
                    Previous
                  </a>
                </li>
                {Array.from({ length: totalPages }).map((_, i) => {
                  return (
                    <li
                      style={{ cursor: "pointer" }}
                      key={i}
                      className={` page-item ${
                        currentPage === i + 1 ? "disabled" : ""
                      }`}
                      onClick={() => handleChangePage(i + 1)}
                    >
                      <a className="page-link">{i + 1}</a>
                    </li>
                  );
                })}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
