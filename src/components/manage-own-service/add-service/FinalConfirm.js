"use client";
import convertEnumToString from "@/utils/convertEnumToString";
import { useEffect, useState } from "react";

export default function FinalConfirm({
  newService,
  newServiceDetail,
  newServiceAddons,
  image,
  setIndexTab,
  indexTab,
  serviceCategoryId,
}) {
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <>
      <fieldset>
        <h3>Confirm your service Information</h3>
        <h6>Please update your service with reasonable price!</h6>
        <div className="text-left">
          <h3>Service name:</h3>
          <p>{newService.name}</p>
          <h3>Address:</h3>
          <p>
            {newService.address}, {convertEnumToString(newService.city)}
          </p>
          <h3>Capacity:</h3>
          <p>{newService.capacity}</p>
          <h3>Overview:</h3>
          <p>{newService.overview}</p>
          <h3>Service Detail: </h3>
          <table className="table">
            <tr>
              <th>#</th>
              <th>Pet Type</th>
              <th>Weight(kg)</th>
              <th>
                Duration(
                {serviceCategoryId == 1 || serviceCategoryId == 2
                  ? "day"
                  : "hour"}
                )
              </th>
              <th>Price(VND)</th>
            </tr>
            {newServiceDetail?.map((serviceDetail, index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{serviceDetail.petType == 1 ? "Dog" : "Cat"}</td>
                  <td>
                    {serviceDetail.weightMin}-{serviceDetail.weightMax}kg
                  </td>
                  <td>
                    {serviceDetail.duration}{" "}
                    {serviceCategoryId == 1 || serviceCategoryId == 2
                      ? "day"
                      : "hour"}
                  </td>
                  <td>{Number(serviceDetail.price).toLocaleString()} VND</td>
                </tr>
              );
            })}
          </table>
          <h3>Service Addons: </h3>
          <table className="table">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
            {newServiceAddons?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.serviceAddonName}</td>
                  <td>{Number(item.serviceAddonPrice).toLocaleString()}</td>
                  <td>{item.description}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="d-flex justify-content-start text-left mb-5">
          <div>
            <h3>Service Image: </h3>
            {preview && <img src={preview} alt="Preview" width={300} />}
          </div>
        </div>
      </fieldset>
      <button
        type="button"
        className="action-button previous_button"
        onClick={() => setIndexTab(indexTab - 1)}
      >
        Back
      </button>
    </>
  );
}
