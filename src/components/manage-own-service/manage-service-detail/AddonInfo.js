"use client";

import { sendRequest } from "@/utils/api";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function AddonInfo({ service, setService }) {
  const [activeAdd, setActiveAdd] = useState(false);

  const checkNameRef = useRef(null);
  const checkPriceRef = useRef(null);
  const checkDescriptionRef = useRef(null);

  const [serviceAddon, setServiceAddon] = useState({
    serviceId: service.serviceId,
    serviceAddonName: "",
    serviceAddonPrice: "",
    description: "",
  });

  async function handleDelete(serviceAddonId) {
    if (service.serviceAddons.length == 1) {
      toast.error(
        <div>
          <strong>You cant delete the last addons of this service</strong>
        </div>
      );
      return;
    }

    try {
      const resServiceAddon = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/service-addons/${serviceAddonId}`,
        body: service.serviceId,
        method: "DELETE",
      });
      if (resServiceAddon.statusCode == 200) {
        setService(resServiceAddon.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  function handleChange(e) {
    const formInput = { ...serviceAddon };
    formInput[e.target.name] = e.target.value;
    setServiceAddon(formInput);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (serviceAddon.serviceAddonName.length == 0) {
      checkNameRef.current.setCustomValidity("Name is required");
      checkNameRef.current.reportValidity();
    } else if (
      serviceAddon.serviceAddonPrice.length == 0 ||
      serviceAddon.serviceAddonPrice < 0
    ) {
      checkPriceRef.current.setCustomValidity("Price is required");
      checkPriceRef.current.reportValidity();
    } else if (serviceAddon.description.length == 0) {
      checkDescriptionRef.current.setCustomValidity("Description is required");
      checkDescriptionRef.current.reportValidity();
    } else {
      try {
        const resServiceAddon = await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/service-addons/${service.serviceId}`,
          body: serviceAddon,
          method: "POST",
        });
        if (resServiceAddon.statusCode == 200) {
          setService(resServiceAddon.data);
          setServiceAddon({
            serviceId: service.serviceId,
            serviceAddonName: "",
            serviceAddonPrice: "",
          });
          setActiveAdd(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <fieldset className="row">
      <legend className="d-flex">
        Service Addons Info
        {!activeAdd && (
          <button
            className="btn btn-warning ml-auto"
            onClick={() => setActiveAdd(true)}
          >
            Add Service <i className="fa-solid fa-plus"></i>
          </button>
        )}
      </legend>
      {activeAdd == true && (
        <>
          <div className="col-md-12">
            <label htmlFor="serviceAddonName">Name:</label>
            <input
              className="form-control"
              type="text"
              id="serviceAddonName"
              name="serviceAddonName"
              ref={checkNameRef}
              value={serviceAddon.serviceAddonName}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="col-md-12 mb-3">
            <label htmlFor="serviceAddonPrice">Price:</label>
            <input
              className="form-control"
              type="number"
              id="serviceAddonPrice"
              name="serviceAddonPrice"
              ref={checkPriceRef}
              value={serviceAddon.serviceAddonPrice}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              ref={checkDescriptionRef}
              value={serviceAddon.description}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="btn btn-lg btn-success ml-3 mb-3"
          >
            Submit
          </button>
        </>
      )}

      <table className="table text-center">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
        {service.serviceAddons?.map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.serviceAddonName}</td>
              <td>{item.serviceAddonPrice.toLocaleString()} VND</td>
              <td>{item.description}</td>
              <td className="row">
                <button
                  className="col-md-12 btn btn-danger mr-2"
                  type="button"
                  onClick={() => handleDelete(item.serviceAddonId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </fieldset>
  );
}
