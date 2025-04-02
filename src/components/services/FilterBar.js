"use client";
import { useEffect, useState } from "react";

export default function FilterBar({
  serviceCategories,
  cities,
  setFilterServices,
  filterServices,
  services,
  setTotalPages,
  setPaginatedData,
  itemsPerPage,
  setCurrentPage,
  petType,
}) {
  const [state, setState] = useState({
    serviceCategoryId: "",
    city: "",
    radius: "",
    priceMin: "",
    priceMax: "",
    petTypeId: "",
  });

  function handleChange(e) {
    const formInput = { ...state };
    formInput[e.target.name] = e.target.value;
    setState(formInput);
  }

  function handleReset() {
    setState({
      serviceCategoryId: "",
      city: "",
      radius: "",
      priceMin: "",
      priceMax: "",
      petTypeId: "",
    });
    setFilterServices(services);
    setTotalPages(Math.ceil(services.length / itemsPerPage));
    setPaginatedData(services.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage));
    setCurrentPage(1);
  }

  async function handleFilter() {
    if (services.length == 0) {
      return;
    }
    let filter = services;
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
    if (state.petTypeId != "") {
      filter = filter.filter((service) => {
        return service.petType.petTypeId == state.petTypeId;
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
    setFilterServices(filter);
    setTotalPages(Math.ceil(filter.length / itemsPerPage));
    setPaginatedData(filter.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage));
    setCurrentPage(1);
  }

  return (
    <div className="filter nice-scroll ">
      <div className="filter__title">
        <h5>
          <i className="fa fa-filter"></i> Filter
        </h5>
      </div>
      <div className="filter__search">
        <input type="text" />
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
      {/* <div className="filter__radius">
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
          </div>
        </div>
      </div> */}
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
