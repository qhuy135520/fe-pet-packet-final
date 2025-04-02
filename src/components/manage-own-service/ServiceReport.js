"use client";

import formatDate from "@/utils/formatDate";
import { useState } from "react";

export default function ServiceReport({ booking }) {
  const [scale, setScale] = useState(false);
  const [active, setActive] = useState(false);
  const [filterBooking, setFilterBooking] = useState(booking);

  function handleFilterClick(status) {
    if (status.length != 0) {
      let filter = booking.filter((item) => {
        return item.transaction.status == status;
      });
      setFilterBooking(filter);
    } else {
      setFilterBooking(booking);
    }
  }
  function handleSortByDate() {
    let sorted = booking.sort(function (a, b) {
      return new Date(a.startDate) - new Date(b.startDate);
    });
    setFilterBooking(sorted);
  }
  function handleResetFilter() {
    setFilterBooking(booking);
  }

  function handleFilterCategoryClick(id) {
    if (id.length != 0) {
      let filter = booking.filter((item) => {
        return item.service.serviceCategory.serviceCategoryId == id;
      });
      setFilterBooking(filter);
    }
  }

  return (
    <>
      <div className="manage-service-filter  d-flex justify-content-center mb-5">
        <div className="filter-container">
          <div className="filter-item">
            <span onClick={() => handleFilterClick("paid")}>Paid</span>
          </div>
          <span className="hyphen-seperator">-</span>
          <div className="filter-item">
            <span onClick={() => handleFilterClick("unpaid")}>Unpaid</span>
          </div>
          <span className="hyphen-seperator">-</span>
          <div className="filter-item">
            <span onClick={() => handleFilterClick("")}>All</span>
          </div>
          <span className="seperator"></span>
          <div className="filter-item " id="statuses">
            <span className="" onClick={() => setScale(!scale)}>
              Category Type
            </span>
          </div>
          <span className="seperator"></span>
          <div className="filter-item " id="statuses">
            <span onClick={() => handleSortByDate()}>Sort By Date</span>
          </div>
          <span className="seperator"></span>
          <div className="filter-item" id="statuses">
            <i className="fas fa-undo" />
            <span onClick={() => handleResetFilter()}>Reset Filters</span>
          </div>
          <div
            className={`text-center filter-dropdown-content ${
              scale ? "scale" : ""
            }`}
          >
            <span
              onClick={() => handleFilterCategoryClick(1)}
              className={`status-filter-chips `}
            >
              Pet Boarding
            </span>
            <span
              onClick={() => handleFilterCategoryClick(3)}
              className="status-filter-chips"
            >
              Pet Grooming
            </span>
            <span
              onClick={() => handleFilterCategoryClick(4)}
              className="status-filter-chips"
            >
              Pet Walking
            </span>
            <span
              onClick={() => handleFilterCategoryClick(2)}
              className="status-filter-chips"
            >
              Pet Sitting
            </span>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <h3 className="font-weight-bold mb-5">Service Report</h3>
        <table className="table table-info table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Service Category</th>
              <th>Service name</th>
              <th>Service Detail</th>
              <th>Size Pet</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Booking Date</th>
              <th>Session</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filterBooking.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.user.name}</td>
                  <td>{item.service.serviceCategory.name}</td>
                  <td>{item.service.name}</td>
                  <td>{item.transaction.serviceDetail}</td>
                  <td>{item.transaction.sizePet}</td>
                  <td>{formatDate(item.startDate)}</td>
                  <td>{formatDate(item.endDate)}</td>
                  <td>{formatDate(item.bookingDate)}</td>
                  <td>{item.session}</td>
                  <td>{item.transaction.amountPaid}</td>
                  <td>{item.transaction.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
