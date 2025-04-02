"use client";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ServiceAddons({
  newServiceAddons,
  setNewServiceAddons,
  setIndexTab,
  indexTab,
}) {
  const checkNameRef = useRef(null);
  const checkPriceRef = useRef(null);
  const checkDescriptionRef = useRef(null);

  const [inputServiceAddons, setInputServiceAddons] = useState({
    id: 0,
    serviceAddonName: "",
    serviceAddonPrice: "",
    description: "",
  });

  function handleServiceAddonsChange(e) {
    const formInput = { ...inputServiceAddons };
    formInput[e.target.name] = e.target.value;
    setInputServiceAddons(formInput);
  }
  const handleAddServiceAddons = (e) => {
    e.preventDefault();
    const pattern = /^[a-zA-Z0-9À-ỹ\s]*$/;
    if (
      inputServiceAddons.serviceAddonName.length == 0 ||
      inputServiceAddons.serviceAddonName.length > 50 ||
      !pattern.test(inputServiceAddons.serviceAddonName)
    ) {
      checkNameRef.current.setCustomValidity("Service Addon name is required!");
      checkNameRef.current.reportValidity();
    } else if (
      inputServiceAddons.serviceAddonPrice.length == 0 ||
      inputServiceAddons.serviceAddonPrice < 0 ||
      inputServiceAddons.serviceAddonPrice > 20000000
    ) {
      checkPriceRef.current.setCustomValidity(
        "Service Addon price must be a positive number less than 20,000,000vnd!"
      );
      checkPriceRef.current.reportValidity();
    } else if (
      inputServiceAddons.description.length == 0 ||
      inputServiceAddons.description.length > 300
    ) {
      checkDescriptionRef.current.setCustomValidity("Description is invalid!");
      checkDescriptionRef.current.reportValidity();
    } else {
      let formInput = [...newServiceAddons];
      formInput.push({
        id: inputServiceAddons.id,
        serviceAddonName: inputServiceAddons.serviceAddonName,
        serviceAddonPrice: inputServiceAddons.serviceAddonPrice,
        description: inputServiceAddons.description,
      });
      setNewServiceAddons(formInput);
      setInputServiceAddons({
        id: Number(inputServiceAddons.id) + 1,
        serviceAddonName: "",
        serviceAddonPrice: "",
        description: "",
      });
    }
  };

  function handleDeleteServiceAddons(id) {
    let formInput = [...newServiceAddons];

    formInput = formInput.filter((item) => {
      return item.id !== id;
    });
    setNewServiceAddons(formInput);
  }
  function handleNext(e) {
    e.preventDefault();

    setIndexTab(indexTab + 1);
  }
  return (
    <>
      <fieldset>
        <h3>Service Add ons</h3>
        <h6>
          Add additional services such as. In Pet Grooming has basic grooming,
          full grooming, shower,...
        </h6>
        <div className="form-row">
          <div className="form-group col-md-12">
            <input
              type="text"
              className="form-control"
              name="serviceAddonName"
              placeholder="Enter Service addons name:"
              value={inputServiceAddons.serviceAddonName}
              onChange={(e) => handleServiceAddonsChange(e)}
              ref={checkNameRef}
            />
          </div>
          <div className="form-group col-md-12">
            <input
              type="number"
              className="form-control"
              name="serviceAddonPrice"
              placeholder="Enter Service addons price:"
              value={inputServiceAddons.serviceAddonPrice}
              onChange={(e) => handleServiceAddonsChange(e)}
              ref={checkPriceRef}
            />
          </div>
          <div className="form-group col-md-12">
            <textarea
              className="form-control"
              name="description"
              placeholder="Describe your Service addon:"
              value={inputServiceAddons.description}
              onChange={(e) => handleServiceAddonsChange(e)}
              ref={checkDescriptionRef}
            />
          </div>
        </div>
        <div className="ml-auto">
          <button
            onClick={(e) => handleAddServiceAddons(e)}
            className="btn btn-warning mb-3 pl-2"
          >
            Add service
          </button>
        </div>
        <table className="table">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
          {newServiceAddons?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.serviceAddonName}</td>
                <td>{Number(item.serviceAddonPrice).toLocaleString()} VND</td>
                <td>{item.description}</td>
                <td>
                  <p
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteServiceAddons(item.id)}
                  >
                    Delete
                  </p>
                </td>
              </tr>
            );
          })}
        </table>
      </fieldset>
      <button
        type="button"
        className="action-button previous_button"
        onClick={() => setIndexTab(indexTab - 1)}
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
