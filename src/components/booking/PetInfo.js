"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import Preloder from "../Preloder";
import { sendRequest } from "@/utils/api";
import { toast } from "react-toastify";

export default function PetInfo({
  inputBooking,
  handleChange,
  service,
  setIndexTab,
  indexTab,
  availableBooking,
  setInputBooking,
}) {
  const checkPetNum = useRef(null);
  const checkServiceDetail = useRef(null);
  const checkCode = useRef(null);
  //   if (loading) {
  //     return <Preloder />;
  //   }

  const [code, setCode] = useState("");

  async function handleNext(e) {
    e.preventDefault();
    if (inputBooking.petNum.length == 0) {
      checkPetNum.current.setCustomValidity("Please Choose number of Pets!");
      checkPetNum.current.reportValidity();
    } else if (inputBooking.serviceDetailId.length == 0) {
      checkServiceDetail.current.setCustomValidity(
        "Average size of pet is required!"
      );
      checkServiceDetail.current.reportValidity();
    } else {
      if (code.length != 0) {
        try {
          const resDiscount = await sendRequest({
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/discount-code/discount/${code}`,
            method: "GET",
          });
          if (resDiscount.error) {
            toast.error(
              <>
                <div>
                  <strong>{resDiscount.error}</strong>
                  <br />
                  <span>{resDiscount.message}</span>
                </div>
              </>
            );
          } else {
            const formInput = { ...inputBooking };
            formInput["discount"] = resDiscount.data;
            setInputBooking(formInput);
          }
        
        } catch (error) {
          console.log(error);
        }
      }
      setIndexTab(indexTab + 1);
    }
  }

  return (
    <div className="d-flex justify-content-center row">
      <div className=" ml-3 mr-3 col-md-6">
        <h5 className="mb-3">How many pets do you need to?</h5>
        <select
          className="form-control"
          name="petNum"
          onChange={(e) => handleChange(e)}
          value={inputBooking.petNum}
          ref={checkPetNum}
        >
          <option value={""}>Select quantity</option>
          {availableBooking == 0 &&
            Array.from({ length: service.capacity }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          {availableBooking > 0 &&
            Array.from(
              { length: service.capacity - availableBooking },
              (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              )
            )}
        </select>
        <h5 className="mb-3 mt-3">What is the size of your pets?</h5>
        <select
          className="form-control"
          name="serviceDetailId"
          onChange={(e) => handleChange(e)}
          value={inputBooking.serviceDetailId}
          ref={checkServiceDetail}
        >
          <option value={""}>Select average weight</option>
          {service.serviceDetails.map((serviceDetail) => {
            if (serviceDetail.petType.petTypeId == inputBooking.petType)
              return (
                <option
                  key={serviceDetail.serviceDetailId}
                  value={serviceDetail.serviceDetailId}
                >
                  {serviceDetail.weightMin}-{serviceDetail.weightMax}
                  kg
                </option>
              );
          })}
        </select>
        <h5 className="mb-3 mt-3">
          Anything else the sitter will need to know?(optional)
        </h5>
        <input
          className="form-control"
          name="note"
          onChange={(e) => handleChange(e)}
          value={inputBooking.note}
        />
        <h5 className="mb-3 mt-3">Discount Code</h5>
        <input
          className="form-control"
          name="code"
          onChange={(e) => setCode(e.target.value)}
          value={code}
          ref={checkCode}
        />
      </div>
      <div className="card-footer col-md-12 mt-5">
        <button
          className="mr-4"
          id="prevBtn"
          onClick={(e) => setIndexTab(indexTab - 1)}
        >
          Prev
        </button>
        <button id="nextBtn" onClick={(e) => handleNext(e)}>
          Next
        </button>
      </div>
    </div>
  );
}
