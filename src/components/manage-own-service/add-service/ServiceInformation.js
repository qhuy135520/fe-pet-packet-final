"use client";
import { useEffect, useRef, useState } from "react";
import Preloder from "../../Preloder";
import { sendRequest } from "@/utils/api";
import { getCoordinates } from "@/utils/getCoordinates";
import { toast } from "react-toastify";
import convertEnumToString from "@/utils/convertEnumToString";

export default function ServiceInformation({
  newService,
  setNewService,
  cities,
  setIndexTab,
  indexTab,
  setIndex,
}) {
  const checkNameRef = useRef(null);
  const checkCityRef = useRef(null);
  const checkAddressRef = useRef(null);
  const checkCapacityRef = useRef(null);
  const checkOverviewRef = useRef(null);

  function handleChange(e) {
    const formInput = { ...newService };
    formInput[e.target.name] = e.target.value;
    setNewService(formInput);
  }

  function handleBack() {
    setIndex(0);
  }

  async function handleNext(e) {
    e.preventDefault();
    const pattern = /^[a-zA-Z0-9À-ỹ\s]*$/;

    if (
      newService.name.length == 0 ||
      newService.name.length > 100 ||
      !pattern.test(newService.name)
    ) {
      checkNameRef.current.setCustomValidity(
        "Service name is required and less than 100 characters!"
      );
      checkNameRef.current.reportValidity();
    } else if (newService.city.length == 0) {
      checkCityRef.current.setCustomValidity("City is required!");
      checkCityRef.current.reportValidity();
    } else if (
      newService.address.length < 3 ||
      newService.address.length > 250
    ) {
      checkAddressRef.current.setCustomValidity(
        "Address is required and less than 250 characters!"
      );
      checkAddressRef.current.reportValidity();
    } else if (
      newService.capacity.length == 0 ||
      newService.capacity < 5 ||
      newService.capacity > 50
    ) {
      checkCapacityRef.current.setCustomValidity(
        "Capacity must be greater than 5 and less than 50"
      );
      checkCapacityRef.current.reportValidity();
    } else if (
      newService.overview.length == 0 ||
      newService.overview.length > 400
    ) {
      checkOverviewRef.current.setCustomValidity(
        "Overview is required and less than 400 characters"
      );
      checkOverviewRef.current.reportValidity();
    } else {
      let location = await getCoordinates(
        `${newService.address}, ${convertEnumToString(newService.city)}`,
        "address"
      );
      console.log(location);
      if (!location) {
        toast.error(
          <div>
            <strong>Error Address</strong> <br />
            <span>Your Address is invalid!</span>
          </div>
        );
      } else {
        setIndexTab(indexTab + 1);
      }
    }
  }

  return (
    <>
      <fieldset>
        <h3>Enter Service Information</h3>
        <h6>Please enter full information to show.</h6>
        <div className="form-row">
          <div className="form-group col-md-12">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter name of Service:"
              value={newService.name}
              onChange={(e) => handleChange(e)}
              ref={checkNameRef}
            />
          </div>

          <div className="form-group col-md-12">
            <select
              className="form-control"
              name="city"
              value={newService.city}
              onChange={(e) => handleChange(e)}
              ref={checkCityRef}
            >
              <option value={""}>Select City</option>
              {cities.map((city) => {
                return (
                  <option key={city.value} value={city.value}>
                    {city.displayName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group col-md-12">
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Enter Address:"
              value={newService.address}
              onChange={(e) => handleChange(e)}
              ref={checkAddressRef}
            />
          </div>
          <div className="form-group col-md-12">
            <input
              type="number"
              className="form-control"
              name="capacity"
              placeholder="Enter limited order within 1 day:"
              min={1}
              value={newService.capacity}
              onChange={(e) => handleChange(e)}
              ref={checkCapacityRef}
            />
          </div>
          <div className="form-group col-md-12">
            <textarea
              className="form-control"
              placeholder="Enter Overview: "
              name="overview"
              value={newService.overview}
              onChange={(e) => handleChange(e)}
              ref={checkOverviewRef}
            ></textarea>
          </div>
        </div>
      </fieldset>
      <button
        type="button"
        className="next action-button"
        onClick={(e) => handleBack(e)}
      >
        Back
      </button>
      <button
        type="button"
        className="next action-button"
        onClick={(e) => handleNext(e)}
      >
        Next
      </button>
    </>
  );
}
