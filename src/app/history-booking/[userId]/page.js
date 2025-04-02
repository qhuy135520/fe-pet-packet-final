"use client";
import Preloder from "@/components/Preloder";
import "@/styles/history-booking/history-booking.css";
import { sendRequest } from "@/utils/api";
import formatDate from "@/utils/formatDate";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function HistoryBooking({ params }) {
  const [booking, setBooking] = useState(null);
  const [filterBooking, setFilterBooking] = useState(null);
  const [scale, setScale] = useState(false);
  const [active, setActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const resBooking = await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/booking/history-Booking/${params.userId}`,
          method: "GET",
        });
        setBooking(resBooking.data);
        setFilterBooking(resBooking.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [params]);
  if (!booking) {
    return <Preloder />;
  }

  async function handlePaynow(id, amountPaid) {
    try {
      const resPayment = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/transaction/create-order`,
        method: "POST",
        body: { transactionId: id, amountPaid },
      });

      router.push(resPayment.data);
    } catch (err) {
      console.log(err);
    }
  }
  function handleFilterClick(status) {
    if (status.length != 0) {
      let filter = booking.filter((item) => {
        return item.status == status;
      });
      setFilterBooking(filter);
    } else {
      setFilterBooking(booking);
    }
  }
  function handleSortByDate() {
    let sorted = filterBooking.sort(function (a, b) {
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
    <div className="history-booking-manage">
      <div className="container-xxl ml-5 mr-5  mt-5">
        <div className="manage-service-filter  d-flex justify-content-center mb-5">
          <div className="filter-container">
            <div className="filter-item">
              <span onClick={() => handleFilterClick("success")}>Paid</span>
            </div>
            <span className="hyphen-seperator">-</span>
            <div className="filter-item">
              <span onClick={() => handleFilterClick("pending")}>Unpaid</span>
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
        <div className="table-manage-service table-responsive">
          <table className="table text-center table-success table-striped table-bordered  ">
            <thead>
              <tr>
                <th>#</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Booking Date</th>
                <th>Service name</th>
                <th>Provider</th>
                <th>Service Category</th>
                <th>Service Detail</th>
                <th>Size Pet</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filterBooking.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatDate(item.startDate)}</td>
                    <td>{formatDate(item.endDate)}</td>
                    <td>{formatDate(item.bookingDate)}</td>
                    <td>{item.service.name}</td>
                    <td>{item.service.user.name}</td>
                    <td>{item.service.serviceCategory.name}</td>

                    <td>{item.transaction.serviceDetail}</td>
                    <td>{item.transaction.sizePet} Kg</td>
                    <td>{item.petNum}</td>
                    <td>{item.transaction.amountPaid.toLocaleString()}</td>
                    {item.status == "success" && (
                      <td className="text-success font-weight-bold">
                        {item.status.toUpperCase()}
                      </td>
                    )}
                    {item.status == "cancel" && (
                      <td className="text-danger font-weight-bold">
                        {item.status.toUpperCase()}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
