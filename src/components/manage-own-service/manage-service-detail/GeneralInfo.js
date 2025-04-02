import { sendRequest } from "@/utils/api";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function GeneralInfo({ cities, service, setService }) {
  const checkNameRef = useRef(null);
  const checkCityRef = useRef(null);
  const checkAddressRef = useRef(null);
  const checkCapacityRef = useRef(null);
  const checkOverviewRef = useRef(null);

  const [inputService, setInputService] = useState(service);

  function handleChange(e) {
    const formInput = { ...inputService };
    formInput[e.target.name] = e.target.value;
    setInputService(formInput);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (inputService.name.length == 0) {
      checkNameRef.current.setCustomValidity("Service's name is required!");
      checkNameRef.current.reportValidity();
    } else if (inputService.city.length == 0) {
      checkCityRef.current.setCustomValidity("Service's city is required!");
      checkCityRef.current.reportValidity();
    } else if (inputService.address.length == 0) {
      checkAddressRef.current.setCustomValidity(
        "Service's address is required!"
      );
      checkAddressRef.current.reportValidity();
    } else if (
      inputService.capacity.length == 0 ||
      inputService.capacity < 5 ||
      inputService.capacity > 50
    ) {
      checkCapacityRef.current.setCustomValidity(
        "Service's Capacity must be a Greater than 5!"
      );
      checkCapacityRef.current.reportValidity();
    } else if (inputService.overview.length == 0) {
      checkOverviewRef.current.setCustomValidity(
        "Service's overview is required!"
      );
      checkOverviewRef.current.reportValidity();
    } else {
      try {
        const res = await sendRequest({
          method: "PUT",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/${service.serviceId}`,
          body: {
            name: inputService.name,
            city: inputService.city,
            address: inputService.address,
            capacity: inputService.capacity,
            overview: inputService.overview,
          },
        });
        if (res.statusCode == 200) {
          setService(res.data);
          toast.success(
            <div>
              <strong>Update Successfull</strong>
            </div>
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <fieldset className="row">
        <legend>General Info</legend>
        <div className="col-md-12">
          <label htmlFor="name">Service Name:</label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={inputService.name}
            onChange={(e) => handleChange(e)}
            ref={checkNameRef}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="categoryType">Category Type:</label>
          <input
            id="categoryType"
            disabled
            className="form-control"
            value={inputService.serviceCategory.name}
          />
        </div>

        <div className="col-md-6"></div>
        <div className="col-md-6">
          <label htmlFor="city">City:</label>
          <select
            ref={checkCityRef}
            className="form-control"
            id="city"
            name="city"
            value={inputService.city}
            onChange={(e) => handleChange(e)}
          >
            {cities.map((city) => {
              return (
                <option key={city.value} value={city.value}>
                  {city.displayName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="address">Address:</label>
          <input
            ref={checkAddressRef}
            className="form-control"
            type="text"
            id="address"
            name="address"
            value={inputService.address}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="capacity">Capacity:</label>
          <input
            className="form-control"
            type="number"
            id="capacity"
            name="capacity"
            ref={checkCapacityRef}
            value={inputService.capacity}
            onChange={(e) => handleChange(e)}
          />
          <small id="emailHelp" className="form-text text-muted">
            This is the limit you can do in a day.
          </small>
        </div>
        <div className="col-md-12">
          <label htmlFor="overview">Overview:</label>
          <textarea
            className="form-control"
            name="overview"
            value={inputService.overview}
            ref={checkOverviewRef}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-success ml-3 mt-3"
          onClick={(e) => handleSubmit(e)}
        >
          Save
        </button>
      </fieldset>
    </>
  );
}
