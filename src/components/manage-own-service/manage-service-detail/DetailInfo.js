import { sendRequest } from "@/utils/api";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function DetailInfo({ service, setService, petType }) {
  const checkPriceRef = useRef(null);
  const checkWeightMax = useRef(null);
  const checkWeightMin = useRef(null);
  const checkDurationRef = useRef(null);
  const checkPetType = useRef(null);

  const [activeAdd, setActiveAdd] = useState(false);
  const [serviceDetail, setServiceDetail] = useState({
    price: "",
    weightMax: "",
    weightMin: "",
    serviceId: service.serviceId,
    petType: "",
    duration:
      service.serviceCategory.serviceCategoryId == 1 ||
      service.serviceCategory.serviceCategoryId == 2
        ? 1
        : "",
    unit:
      service.serviceCategory.serviceCategoryId == 3 ||
      service.serviceCategory.serviceCategoryId == 4
        ? "hour"
        : "day",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (serviceDetail.petType.length == 0) {
      checkPetType.current.setCustomValidity("Pet Type is required!");
      checkPetType.current.reportValidity();
    } else if (
      serviceDetail.duration <= 0 ||
      serviceDetail.duration.length == 0 ||
      serviceDetail.duration > 5
    ) {
      checkDurationRef.current.setCustomValidity(
        "Duration must be less than 5!"
      );
      checkDurationRef.current.reportValidity();
    } else if (
      serviceDetail.weightMin.length == 0 ||
      serviceDetail.weightMin < 0
    ) {
      checkWeightMin.current.setCustomValidity(
        "Weight min must be a positive number!"
      );
      checkWeightMin.current.reportValidity();
    } else if (
      serviceDetail.weightMax.length == 0 ||
      Number(serviceDetail.weightMax) <= Number(serviceDetail.weightMin)
    ) {
      checkWeightMax.current.setCustomValidity(
        "Weight max is required and greater than weight min!"
      );
      checkWeightMax.current.reportValidity();
    } else if (serviceDetail.price.length == 0 || serviceDetail.price <= 0) {
      checkPriceRef.current.setCustomValidity(
        "Price must be a positive number!"
      );
      checkPriceRef.current.reportValidity();
    } else {
      try {
        const res = await sendRequest({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/service-detail/${service.serviceId}`,
          body: serviceDetail,
        });
        if (res.statusCode == 200) {
          setService(res.data);
          setServiceDetail({
            price: "",
            weightMax: "",
            weightMin: "",
            serviceId: service.serviceId,
            duration: "",
            unit: "hour",
          });
          setActiveAdd(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  async function handleDelete(id) {
    try {
      if (service.serviceDetails.length == 1) {
        toast.error(
          <div>
            <strong>You cant delete the last detail of this service</strong>
          </div>
        );
        return;
      }
      const res = await sendRequest({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/service-detail/${id}`,
        body: service.serviceId,
      });
      if (res.statusCode == 200) {
        setService(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    const formInput = { ...serviceDetail };
    formInput[e.target.name] = e.target.value;
    setServiceDetail(formInput);
  }
  return (
    <fieldset className="row">
      <legend className="d-flex">
        Service Detail Info
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
          {service.serviceCategory.serviceCategoryId == 1 ||
            (service.serviceCategory.serviceCategoryId == 2 && (
              <div className="col-md-12">
                <label htmlFor="duration">Duration(hour):</label>
                <input
                  className="form-control"
                  type="number"
                  id="duration"
                  name="duration"
                  ref={checkDurationRef}
                  value={serviceDetail.duration}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            ))}
          <div className="col-md-12">
            <label htmlFor="petType">Pet Type:</label>
            <select
              className="form-control"
              name="petType"
              value={serviceDetail.petType}
              onChange={(e) => handleChange(e)}
              ref={checkPetType}
            >
              <option value={""}>Select Pet Type</option>
              {petType.map((type) => {
                return (
                  <option key={type.petTypeId} value={type.petTypeId}>
                    {type.petTypeName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="weightMin">Weigt Min(kg):</label>
            <input
              className="form-control"
              type="number"
              id="weightMin"
              name="weightMin"
              ref={checkWeightMin}
              value={serviceDetail.weightMin}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="weightMax">Weight Max(kg):</label>
            <input
              className="form-control"
              type="number"
              id="weightMax"
              name="weightMax"
              ref={checkWeightMax}
              value={serviceDetail.weightMax}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="price">Price:</label>
            <input
              className="form-control"
              type="number"
              id="price"
              name="price"
              ref={checkPriceRef}
              value={serviceDetail.price}
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
          <th>Pet Type</th>
          <th>Weight(kg)</th>
          <th>Duration(hour)</th>
          <th>Price(VND)</th>
          <th>Action</th>
        </tr>
        {service.serviceDetails?.map((serviceDetail, index) => {
          return (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{serviceDetail.petType.petTypeName}</td>
              <td>
                {serviceDetail.weightMin}-{serviceDetail.weightMax}kg
              </td>
              <td>{serviceDetail.timeDuration} hour</td>
              <td>{serviceDetail.price.toLocaleString()} VND</td>
              <td className="row">
                <button
                  type="button"
                  className="col-md-12 btn btn-danger mr-2"
                  onClick={() => handleDelete(serviceDetail.serviceDetailId)}
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
