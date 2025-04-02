"use client";
import convertEnumToString from "@/utils/convertEnumToString";
import {
  getCoordinates,
  getCoordinatesCenterPoint,
} from "@/utils/getCoordinates";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FilterBarWithLocation({
  serviceCategories,
  cities,
  setFilterServices,
  services,
  setTotalPages,
  setPaginatedData,
  itemsPerPage,
  setCurrentPage,
  setMarkers,
  setFilterLoading,
  setCenterPoint,
  setRadius,
}) {
  const [state, setState] = useState({
    serviceCategoryId: "",
    city: "",
    radius: "",
    priceMin: "",
    priceMax: "",
    petTypeId: "",
    name: "",
    radius: "",
    centerPoint: "",
  });

  function handleChange(e) {
    const formInput = { ...state };
    formInput[e.target.name] = e.target.value;
    setState(formInput);
  }

  async function handleReset() {
    setState({
      serviceCategoryId: "",
      city: "",
      radius: "",
      priceMin: "",
      priceMax: "",
      petTypeId: "",
      name: "",
      radius: "",
      centerPoint: "",
    });
    setFilterServices(services);
    setTotalPages(Math.ceil(services.length / itemsPerPage));
    setPaginatedData(services.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage));
    setCurrentPage(1);

    let formMarker = [];
    for (const item of services) {
      const marker = await getCoordinates(item.address, item.name);
      formMarker = [...formMarker, marker];
    }
    setMarkers(formMarker);
  }

  const haversineDistance = (lon1, lat1, lon2, lat2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  async function handleFilter() {
    if (services.length == 0) {
      return;
    }

    setFilterLoading(true);
    let filter = services;
    if (state.name != "") {
      filter = filter.filter((item) => {
        return item.name.toLowerCase().includes(state.name.toLowerCase());
      });
    }
    if (state.serviceCategoryId != "") {
      filter = filter.filter((service) => {
        return (
          service.serviceCategory.serviceCategoryId == state.serviceCategoryId
        );
      });
    }
    if (state.city != "") {
      filter = filter.filter((service) => {
        return service.city == state.city;
      });
    }

    if (state.priceMin != "" && state.priceMax != "") {
      filter = filter.filter((service) => {
        let flag = false;
        service.serviceDetails.map((item) => {
          if (item.price <= state.priceMax && item.price >= state.priceMin) {
            flag = true;
          }
        });
        return flag;
      });
    }

    let formMarker = [];
    for (const item of filter) {
      const marker = await getCoordinates(item.address, item);
      formMarker = [...formMarker, marker];
    }
    if (state.centerPoint != "") {
      let filtered = [];
      const centerPoint = await getCoordinatesCenterPoint(
        state.centerPoint,
        convertEnumToString(state.centerPoint)
      );
      if (centerPoint) {
        setCenterPoint(centerPoint);
        setRadius(state.radius);
        let radius = state.radius;
        if (state.radius != "") {
          if (state.radius <= 0 || state.radius > 1000) {
            toast.error(
              <>
                <strong>Error Radius</strong> <br />
                <span>Radius must be greater than 0 and less than 500!!</span>
              </>
            );
          } else {
            filtered = formMarker.filter((marker) => {
              const distance = haversineDistance(
                centerPoint.coords[0],
                centerPoint.coords[1],
                marker.coords[0],
                marker.coords[1]
              );
              return Number(distance) <= Number(radius);
            });
            filter = [];
            filtered.map((item) => {
              filter.push(item.service);
            });
            formMarker = filtered;
          }
        }
        if (state.radius == "") {
          radius = 10000;
          filtered = formMarker.filter((marker) => {
            const distance = haversineDistance(
              centerPoint.coords[0],
              centerPoint.coords[1],
              marker.coords[0],
              marker.coords[1]
            );
            return Number(distance) <= Number(radius);
          });
          filter = [];
          filtered.map((item) => {
            filter.push(item.service);
          });
          formMarker = filtered;
        }
      } else {
        toast.error(
          <>
            <strong>Error Address</strong> <br />
            <span>Your Location is invalid!</span>
          </>
        );
      }
    } else {
      setRadius("");
    }

    setFilterServices(filter);
    setTotalPages(Math.ceil(filter.length / itemsPerPage));
    setPaginatedData(filter.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage));
    setCurrentPage(1);
    setMarkers(formMarker);
    setFilterLoading(false);
  }

  return (
    <div className="filter nice-scroll ">
      <div className="filter__title">
        <h5>
          <i className="fa fa-filter"></i> Filter
        </h5>
      </div>
      <div className="filter__search">
        <input
          type="text"
          placeholder="Enter name of Service"
          name="name"
          value={state.name}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="filter__select ">
        <select
          className="form-control"
          name="serviceCategoryId"
          value={state.serviceCategoryId}
          onChange={(e) => handleChange(e)}
        >
          <option value="">All Categories</option>
          {serviceCategories.map((category) => {
            return (
              <option
                key={category.serviceCategoryId}
                value={category.serviceCategoryId}
              >
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="filter__location">
        {/* <input type="text" placeholder="Location" /> */}
        <select
          className="form-control"
          name="city"
          value={state.city}
          onChange={(e) => handleChange(e)}
        >
          <option value="">Choose Location</option>
          {cities.map((city) => {
            return (
              <option key={city.value} value={city.value}>
                {city.displayName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="filter__radius">
        <div className="price-range-wrap">
          <div className="range-slider">
            <div className=" form-group filter__location">
              <label htmlFor="radiusInput">Radius:</label>
              <input
                className="form-control border"
                type="number"
                placeholder="Enter Radius.."
                id="radiusInput"
                name="radius"
                value={state.radius}
                onChange={(e) => handleChange(e)}
              />
              <i className="fa fa-map-marker pr-3"></i>
            </div>
            <div className=" form-group filter__location">
              <input
                type="text"
                className="form-control"
                name="centerPoint"
                value={state.centerPoint}
                onChange={(e) => handleChange(e)}
                placeholder="Enter your Location"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="filter__price">
        <p>Price:</p>
        <div className="price-range-wrap">
          <div className="range-slider">
            <div className="form-group row">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  name="priceMin"
                  value={state.priceMin}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  name="priceMax"
                  value={state.priceMax}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="filter__btns">
        <button type="submit" onClick={() => handleFilter()}>
          Filter Results
        </button>
        <button
          type="submit"
          className="filter__reset"
          onClick={() => handleReset()}
        >
          Reset All
        </button>
      </div>
    </div>
  );
}
