"use client";

import { sendRequest } from "@/utils/api";
import formatDate from "@/utils/formatDate";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Vouchers({ serviceId, setIndexTab }) {
  const checkCode = useRef(null);
  const checkDiscountValue = useRef(null);
  const checkMinOrderValue = useRef(null);
  const checkStartDate = useRef(null);
  const checkEndDate = useRef(null);
  const checkUsageLimit = useRef(null);

  const [vouchers, setVouchers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newVoucher, setNewVoucher] = useState({
    code: "",
    discountValue: 0,
    minOrderValue: 0,
    startDate: "",
    endDate: "",
    usageLimit: 0,
    serviceId: serviceId,
  });

  function handleChange(e) {
    const formInput = { ...newVoucher };
    formInput[e.target.name] = e.target.value;
    setNewVoucher(formInput);
  }

  useEffect(() => {
    async function getData() {
      const resVouchers = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/discount-code/${serviceId}`,
        method: "GET",
      });
      if (resVouchers) {
        setVouchers(resVouchers.data);
        setLoading(false);
      }
    }
    getData();
  }, [serviceId]);

  if (loading) {
    return (
      <div
        style={{ height: "40vh", marginTop: "250px" }}
        className="text-center"
      >
        <h3>...Loading</h3>
      </div>
    );
  }

  function handleBack(e) {
    e.preventDefault();
    setIndexTab(2);
  }

  async function handleChangeStatus(id) {
    setLoading(true);
    try {
      const resVouchers = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/discount-code/${id}`,
        method: "PUT",
        body: newVoucher,
      });
      if (resVouchers) {
        setVouchers(resVouchers.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    const start = Date.now();
    const today = new Date();
today.setHours(0, 0, 0, 0); 
    e.preventDefault();
    if (newVoucher.code.length == 0 || newVoucher.code.length > 30) {
      checkCode.current.setCustomValidity(
        "Code must be less than 30 characters"
      );
      checkCode.current.reportValidity();
    } else if (
      newVoucher.discountValue.length == 0 ||
      Number(newVoucher.discountValue) <= 0 ||
      Number(newVoucher.discountValue) > 50
    ) {
      checkDiscountValue.current.setCustomValidity(
        "Discount Value must be less than 50%"
      );
      checkDiscountValue.current.reportValidity();
    } else if (
      newVoucher.minOrderValue.length == 0 ||
      Number(newVoucher.minOrderValue) < 0
    ) {
      checkMinOrderValue.current.setCustomValidity(
        "Min order Value must be greater than"
      );
      checkMinOrderValue.current.reportValidity();
    } else if (
      newVoucher.startDate.length == 0 ||
      new Date(newVoucher.startDate) < today
    ) {
      checkStartDate.current.setCustomValidity(
        "Start date must be greater than now"
      );
      checkStartDate.current.reportValidity();
    } else if (
      newVoucher.endDate.length == 0 ||
      new Date(newVoucher.endDate) - start < 0
    ) {
      checkEndDate.current.setCustomValidity(
        "End date must be greater than Now"
      );
      checkEndDate.current.reportValidity();
    } else {
      const resVouchers = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/discount-code`,
        method: "POST",
        body: newVoucher,
      });
      if (resVouchers.error) {
        toast.error(
          <div>
            <strong>{resVouchers.error}</strong>
            <br />
            <span>{resVouchers.message}</span>
          </div>
        );
      } else {
        setVouchers(resVouchers.data);

        setNewVoucher({
          code: "",
          discountValue: 0,
          minOrderValue: 0,
          startDate: "",
          endDate: "",
          usageLimit: 0,
          serviceId: serviceId,
        });
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between container mt-5">
        <div>
          <button className="btn btn-primary" onClick={(e) => handleBack(e)}>
            Back <i class="fa-solid fa-backward"></i>
          </button>
        </div>
        <div>
          <h3 className="text-center">Manage Vouchers</h3>
        </div>
        <div>
          <button
            className="btn btn-warning"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Create Vouchers
          </button>
        </div>
      </div>
      <div className=" mt-5 " style={{ margin: "50px 10% 50px 10%" }}>
        <table className="table text-center">
          <thead class="thead-light">
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Discount Value</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Usage Limit</th>
              <th>Usage Count</th>
              <th>Is Actived</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vouchers?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.code}</td>
                  <td>{item.discountValue}%</td>
                  {/* <td>{item.minOrderValue.toLocaleString()}</td> */}
                  <td>{formatDate(item.startDate)}</td>
                  <td>{formatDate(item.endDate)}</td>
                  <td>{item.usageLimit}</td>
                  <td>{item.usageCount}</td>
                  {item.isActive == true ? (
                    <td className="text-success font-weight-bold">ACTIVED</td>
                  ) : (
                    <td className="text-danger font-weight-bold">INACTIVED</td>
                  )}
                  <td>
                    {item.isActive == true ? (
                      <button
                        type="button"
                        onClick={() =>
                          handleChangeStatus(`${item.disCountCodeId}`)
                        }
                        className="btn btn-danger"
                      >
                        INACTIVE
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          handleChangeStatus(`${item.disCountCodeId}`)
                        }
                        className="btn btn-success"
                      >
                        ACTIVE
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Create Vouchers
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Code</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Code"
                  name="code"
                  value={newVoucher.code}
                  onChange={(e) => handleChange(e)}
                  ref={checkCode}
                />
              </div>
              <div class="form-group">
                <label>Discount Value</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Discount Value(%)"
                  name="discountValue"
                  value={newVoucher.discountValue}
                  onChange={(e) => handleChange(e)}
                  ref={checkDiscountValue}
                />
              </div>
              <div class="form-group">
                <label>Min Order Value</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Min order Value"
                  name="minOrderValue"
                  value={newVoucher.minOrderValue}
                  onChange={(e) => handleChange(e)}
                  ref={checkMinOrderValue}
                />
              </div>
              <div class="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  class="form-control"
                  name="startDate"
                  value={newVoucher.startDate}
                  onChange={(e) => handleChange(e)}
                  ref={checkStartDate}
                />
              </div>
              <div class="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  class="form-control"
                  name="endDate"
                  value={newVoucher.endDate}
                  onChange={(e) => handleChange(e)}
                  ref={checkEndDate}
                />
              </div>
              <div class="form-group">
                <label>Usage Limit</label>
                <input
                  type="number"
                  class="form-control"
                  name="usageLimit"
                  value={newVoucher.usageLimit}
                  onChange={(e) => handleChange(e)}
                  ref={checkUsageLimit}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
