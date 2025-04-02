"use client";
import Map from "@/components/Map";
import MapOther from "@/components/MapOther";
import Preloder from "@/components/Preloder";
import FilterBarWithLocation from "@/components/services/FilterBarWithLocation";
import ListingService from "@/components/services/ListingService";
import { sendRequest } from "@/utils/api";
import { getCoordinates } from "@/utils/getCoordinates";
import { useEffect, useState } from "react";

export default function Services({ searchParams }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [services, setServices] = useState([]);
  const [filterServices, setFilterServices] = useState(null);

  const [totalPages, setTotalPages] = useState(null);
  const [paginatedData, setPaginatedData] = useState(null);

  const [markers, setMarkers] = useState([]);
  const [centerPoint, setCenterPoint] = useState({
    coords: [105.8542, 21.0285],
    name: "Ha Noi",
  });

  const [radius, setRadius] = useState("");

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

  const [serviceCategories, setServiceCategories] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        // get cities list
        const resCities = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/cities`,
        });
        setCities(resCities.data);

        // get service categories list
        const resCategories = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/service-categories`,
        });
        setServiceCategories(resCategories.data);

       

        // get services list
        const resServices = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/`,
        });
        setServices(resServices.data);
        let formFilter = await resServices.data;
        if (
          searchParams.searchName != undefined &&
          searchParams.searchName.length != 0
        ) {
          formFilter = formFilter.filter((item) => {
            return item.name
              .toLowerCase()
              .includes(searchParams.searchName.toLowerCase());
          });
        }
        if (
          searchParams.searchCategory != undefined &&
          searchParams.searchCategory.length != 0
        ) {
          formFilter = formFilter.filter((item) => {
            return (
              item.serviceCategory.serviceCategoryId ==
              searchParams.searchCategory
            );
          });
        }
        if (
          searchParams.searchLocation != undefined &&
          searchParams.searchLocation.length != 0
        ) {
          formFilter = formFilter.filter((item) => {
            return item.city == searchParams.searchLocation;
          });
        }
        setTotalPages(Math.ceil(formFilter.length / itemsPerPage));
        setFilterServices(formFilter);

        let formMarker = [];

        for (const item of formFilter) {
          const marker = await getCoordinates(item.address, item);
          formMarker = [...formMarker, marker];
        }
        setMarkers(formMarker);

        setPaginatedData(
          formFilter.slice(
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
  if (loading) {
    return <Preloder />;
  }
  if (filterLoading) {
    return (
      <>
        <FilterBarWithLocation
          serviceCategories={serviceCategories}
          cities={cities}
          filterServices={filterServices}
          setFilterServices={setFilterServices}
          services={services}
          setTotalPages={setTotalPages}
          setPaginatedData={setPaginatedData}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setMarkers={setMarkers}
          setFilterLoading={setFilterLoading}
          setCenterPoint={setCenterPoint}
          setRadius={setRadius}
        />
        <div
          style={{ height: "40vh", marginTop: "450px" }}
          className="text-center"
        >
          <h3>...Filtering it up</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <FilterBarWithLocation
        serviceCategories={serviceCategories}
        cities={cities}
        filterServices={filterServices}
        setFilterServices={setFilterServices}
        services={services}
        setTotalPages={setTotalPages}
        setPaginatedData={setPaginatedData}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        setMarkers={setMarkers}
        setFilterLoading={setFilterLoading}
        setCenterPoint={setCenterPoint}
        setRadius={setRadius}
      />
      <section className="listing nice-scroll" style={{ marginBottom: "50px" }}>
        <div className="listing__text__top">
          <div className="listing__text__top__left">
            <h5>Pet Services</h5>
            <span>{filterServices.length} Results Found</span>
          </div>
          <div className="listing__text__top__right">
            Nearby <i className="fa fa-sort-amount-asc"></i>
          </div>
        </div>
        <div className="listing__list">
          {paginatedData?.map((item) => {
            return <ListingService key={item.serviceId} service={item} />;
          })}
        </div>
        {paginatedData?.length > 0 && (
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li
                onClick={() => handleChangePage(currentPage - 1)}
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
                onClick={() => handleChangePage(currentPage + 1)}
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
      </section>

      <div className="listing__map" style={{ marginBottom: "50px" }}>
        {/* <iframe
          src={mapSrc}
          style={{ border: 0 }}
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe> */}

        {/* <Map lat={location.lat} lng={location.lng} /> */}
        <MapOther markers={markers} centerPoint={centerPoint} radius={radius} />
      </div>
    </>
  );
}
