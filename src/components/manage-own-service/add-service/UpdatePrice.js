import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function UpdatePrice({
  newServiceDetail,
  setNewServiceDetail,
  serviceCategoryId,
  indexTab,
  setIndexTab,
  petType,
}) {
  const checkDurationRef = useRef(null);
  const checkWeightMinRef = useRef(null);
  const checkWeightMaxRef = useRef(null);
  const checkPriceRef = useRef(null);
  const checkPetType = useRef(null);

  const [inputServiceDetail, setInputServiceDetail] = useState({
    id: 0,
    duration: serviceCategoryId == 1 || serviceCategoryId == 2 ? 1 : "",
    petType: "",
    unit: serviceCategoryId == 1 || serviceCategoryId == 2 ? "day" : "hour",
    weightMax: "",
    weightMin: "",
    price: "",
  });
  function handleServiceDetailChange(e) {
    const formInput = { ...inputServiceDetail };
    formInput[e.target.name] = e.target.value;
    setInputServiceDetail(formInput);
  }

  function checkExistServiceDetail(weightMin, weightMax, petType) {
    let flag = false;
    newServiceDetail.map((item) => {
      if (
        Number(item.weightMin) === Number(weightMin) &&
        Number(weightMax) === Number(item.weightMax) &&
        Number(petType) === Number(item.petType)
      ) {
        flag = true;
      }
    });
    return flag;
  }

  const handleAddToNewServiceDetail = (e) => {
    e.preventDefault();
    if (inputServiceDetail.petType.length == 0) {
      checkPetType.current.setCustomValidity("Pet Type is required!");
      checkPetType.current.reportValidity();
    } else if (
      (inputServiceDetail.duration.length == 0 ||
        inputServiceDetail.duration <= 0 ||
        inputServiceDetail.duration > 5) &&
      serviceCategoryId != 1 &&
      serviceCategoryId != 2
    ) {
      checkDurationRef.current.setCustomValidity(
        `Duration must be from 1 to 5(${
          serviceCategoryId == 1 || serviceCategoryId == 2 ? "day" : "hour"
        })`
      );
      checkDurationRef.current.reportValidity();
    } else if (
      inputServiceDetail.weightMin.length == 0 ||
      inputServiceDetail.weightMin <= 0
    ) {
      checkWeightMinRef.current.setCustomValidity(
        "Weight min must be a positive number!"
      );
      checkWeightMinRef.current.reportValidity();
    } else if (
      inputServiceDetail.weightMax.length == 0 ||
      Number(inputServiceDetail.weightMax) <=
        Number(inputServiceDetail.weightMin) ||
      inputServiceDetail.weightMax > 100 ||
      inputServiceDetail.weightMax < 1
    ) {
      checkWeightMaxRef.current.setCustomValidity(
        "Weight max is required and must be greater than weight min and less than 100kg!"
      );
      checkWeightMaxRef.current.reportValidity();
    } else if (
      checkExistServiceDetail(
        inputServiceDetail.weightMin,
        inputServiceDetail.weightMax,
        inputServiceDetail.petType
      ) == true
    ) {
      toast.error(
        <>
          <strong>Error Price</strong>
          <br />
          <strong>This Service Detail existing in your list!</strong>
        </>
      );
    } else if (
      inputServiceDetail.price.length == 0 ||
      inputServiceDetail.price <= 0 ||
      inputServiceDetail.price > 20000000
    ) {
      checkPriceRef.current.setCustomValidity(
        `Price must be a positive number and less than 20,000,000vnd!`
      );
      checkPriceRef.current.reportValidity();
    } else {
      checkWeightMaxRef.current.setCustomValidity("");
      checkWeightMaxRef.current.reportValidity();
      let formInput = [...newServiceDetail];
      formInput.push({
        id: inputServiceDetail.id,
        duration: inputServiceDetail.duration,
        weightMax: inputServiceDetail.weightMax,
        weightMin: inputServiceDetail.weightMin,
        price: inputServiceDetail.price,
        unit: inputServiceDetail.unit,
        petType: inputServiceDetail.petType,
      });

      formInput = formInput.sort((a, b) => {
        if (a.petType != b.petType) {
          return a.petType - b.petType;
        } else {
          return a.weightMin - b.weightMin;
        }
      });

      setNewServiceDetail(formInput);
      setInputServiceDetail({
        id: Number(inputServiceDetail.id) + 1,
        duration: serviceCategoryId == 1 || serviceCategoryId == 2 ? 1 : "",
        unit: serviceCategoryId == 1 || serviceCategoryId == 2 ? "day" : "hour",
        weightMax: "",
        weightMin: "",
        price: "",
        petType: "",
      });
    }
  };

  function handleDeletePrice(id) {
    let formInput = [...newServiceDetail];

    formInput = formInput.filter((item) => {
      return item.id !== id;
    });
    console.log("formInput", formInput);
    setNewServiceDetail(formInput);
  }
  function handleNext(e) {
    e.preventDefault();
    if (newServiceDetail.length == 0) {
      toast.error(
        <>
          <strong>Error Price</strong>
          <br />
          <strong>You must add at least 1 price for!</strong>
        </>
      );
    } else {
      setIndexTab(indexTab + 1);
    }
  }
  return (
    <>
      <fieldset>
        <h3>Update price list by size</h3>
        <h6>Please update your service with reasonable price!</h6>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              className="form-control"
              name="petType"
              value={inputServiceDetail.petType}
              onChange={(e) => handleServiceDetailChange(e)}
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
          {serviceCategoryId != 1 && serviceCategoryId != 2 && (
            <div className="form-group col-md-12">
              <input
                type="number"
                className="form-control"
                name="duration"
                placeholder={`Enter time duration(${
                  serviceCategoryId == 1 || serviceCategoryId == 2
                    ? "day"
                    : "hour"
                }):`}
                value={inputServiceDetail.duration}
                onChange={(e) => handleServiceDetailChange(e)}
                ref={checkDurationRef}
              />
            </div>
          )}
          <div className="form-group col-md-6">
            <input
              type="number"
              className="form-control"
              name="weightMin"
              placeholder="Enter weight min: "
              value={inputServiceDetail.weightMin}
              onChange={(e) => handleServiceDetailChange(e)}
              ref={checkWeightMinRef}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="number"
              className="form-control"
              name="weightMax"
              placeholder="Enter weight max: "
              value={inputServiceDetail.weightMax}
              onChange={(e) => handleServiceDetailChange(e)}
              ref={checkWeightMaxRef}
            />
          </div>
          <div className="form-group col-md-12">
            <input
              type="number"
              className="form-control"
              name="price"
              placeholder="Enter Price: "
              value={inputServiceDetail.price}
              onChange={(e) => handleServiceDetailChange(e)}
              ref={checkPriceRef}
            />
          </div>
          <div className="d-flex justify-content-center mb-3 mr-2 ml-auto">
            <div>
              <button
                className="btn btn-warning"
                onClick={(e) => handleAddToNewServiceDetail(e)}
              >
                Add price
              </button>
            </div>
          </div>
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
              <th>Action</th>
            </tr>
            {newServiceDetail?.map((serviceDetail, index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{Number(serviceDetail.petType) === 1 ? "Dog" : "Cat"}</td>
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
                  <td>
                    <p
                      style={{ cursor: "pointer" }}
                      className="text-danger"
                      onClick={() => handleDeletePrice(serviceDetail.id)}
                    >
                      Delete
                    </p>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
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
