"use client";
import Preloder from "@/components/Preloder";
import { sendRequest } from "@/utils/api";
import formatDate from "@/utils/formatDate";
import { useEffect, useState } from "react";
import "@/styles/your-listing/your-listing.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function YourListing({ params }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBookings, setSelectedBookings] = useState([]);

  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const resBooking = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/booking/get-own-booking-pending/${params.userId}`,
        method: "GET",
      });

      if (resBooking) {
        setBooking(resBooking.data);
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handleCheckboxChange = (bookingId) => {
    setSelectedBookings((prev) =>
      prev.includes(bookingId)
        ? prev.filter((id) => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBookings.length === booking.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(booking.map((item) => item.bookingId));
    }
  };

  if (loading) {
    return <Preloder />;
  }

  function sumarizeOrder() {
    let total = 0;
    booking.map((item) => {
      if (selectedBookings.includes(item.bookingId)) {
        total += item.transaction.amountPaid;
      }
    });

    return total;
  }

  async function handleClick() {
    let total = sumarizeOrder();
    if (total === 0) {
      toast.error(
        <div>
          <strong>Payment Error</strong> <br />
          <span>Please choose at least 1 Service!</span>
        </div>
      );
    } else {
      const payload = {
        listBookingIds: selectedBookings,
        amountPaid: sumarizeOrder(),
      };

      const resPayment = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/transaction/create-order`,
        method: "POST",
        body: payload,
      });
      router.push(resPayment.data);
    }
  }

  return (
    <div
      className=" your-listing-manage"
      style={{ margin: "200px 200px 50px 200px" }}
    >
      <div className=" table-responsive">
        <table className="table text-center ">
          <thead>
            <tr>
              <th>
                <div class="checkbox-wrapper-19">
                  <input
                    type="checkbox"
                    id="cbtest"
                    checked={
                      selectedBookings.length === booking.length &&
                      booking.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                  <label for="cbtest" class="check-box mb-0" />
                </div>
              </th>
              <th>Appointment Date</th>
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
            {booking.map((item, index) => {
              return (
                <tr key={index}>
                  <td class="align-middle">
                    <div class="checkbox-wrapper-19">
                      <input
                        type="checkbox"
                        id={`cbtest-${item.bookingId}`}
                        value={item.bookingId}
                        checked={selectedBookings.includes(item.bookingId)}
                        onChange={() => handleCheckboxChange(item.bookingId)}
                      />
                      <label
                        htmlFor={`cbtest-${item.bookingId}`}
                        class="check-box mb-0"
                      />
                    </div>
                  </td>
                  <td class="align-middle">
                    {formatDate(item.startDate)} <br /> to <br />
                    {formatDate(item.endDate)}
                  </td>
                  <td class="align-middle">{formatDate(item.bookingDate)}</td>
                  <td class="align-middle">{item.service.name}</td>
                  <td class="align-middle">{item.service.user.name}</td>
                  <td class="align-middle">
                    {item.service.serviceCategory.name}
                  </td>

                  <td class="align-middle">{item.transaction.serviceDetail}</td>
                  <td class="align-middle">{item.transaction.sizePet} Kg</td>
                  <td class="align-middle">{item.petNum}</td>

                  <td class="align-middle">
                    {item.transaction.amountPaid.toLocaleString()}
                  </td>
                  <td className="text-primary font-weight-bold align-middle">
                    {item.status.toUpperCase()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h1 class="h3 mb-5">Payment</h1>
      <div class="row">
        <div class="col-lg-9">
          <div class="accordion" id="accordionPayment">
            <div class="accordion-item mb-3">
              <h2 class="h5 px-4 py-3 accordion-header d-flex justify-content-between align-items-center">
                <div
                  class="form-check w-100 collapsed border d-flex justify-content-between align-items-center"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCC"
                  aria-expanded="false"
                >
                  <div class="radio-wrapper-11 ">
                    <label class="radio-wrapper-11" htmlFor="example-10">
                      <span class="text"> VNPay</span>
                    </label>
                  </div>
                  <span>
                    <img
                      className="mt-3 mb-3 mr-3"
                      width={"110px"}
                      src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png"
                    />
                  </span>
                </div>
              </h2>
            </div>
            <div class="accordion-item mb-3 ">
              <h2 class="h5 px-4 py-3 accordion-header d-flex justify-content-between align-items-center">
                <div
                  class="form-check w-100 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePP"
                  aria-expanded="false"
                >
                  <div class="radio-wrapper-11 ">
                    <label class="radio-wrapper-11" for="example-11">
                      <span class="text"> Paypal</span>
                    </label>
                  </div>
                </div>
                <span>
                  <svg
                    width="103"
                    height="25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <path
                        d="M8.962 5.857h7.018c3.768 0 5.187 1.907 4.967 4.71-.362 4.627-3.159 7.187-6.87 7.187h-1.872c-.51 0-.852.337-.99 1.25l-.795 5.308c-.052.344-.233.543-.505.57h-4.41c-.414 0-.561-.317-.452-1.003L7.74 6.862c.105-.68.478-1.005 1.221-1.005Z"
                        fill="#009EE3"
                      ></path>
                      <path
                        d="M39.431 5.542c2.368 0 4.553 1.284 4.254 4.485-.363 3.805-2.4 5.91-5.616 5.919h-2.81c-.404 0-.6.33-.705 1.005l-.543 3.455c-.082.522-.35.779-.745.779h-2.614c-.416 0-.561-.267-.469-.863l2.158-13.846c.106-.68.362-.934.827-.934h6.263Zm-4.257 7.413h2.129c1.331-.051 2.215-.973 2.304-2.636.054-1.027-.64-1.763-1.743-1.757l-2.003.009-.687 4.384Zm15.618 7.17c.239-.217.482-.33.447-.062l-.085.642c-.043.335.089.512.4.512h2.323c.391 0 .581-.157.677-.762l1.432-8.982c.072-.451-.039-.672-.38-.672H53.05c-.23 0-.343.128-.402.48l-.095.552c-.049.288-.18.34-.304.05-.433-1.026-1.538-1.486-3.08-1.45-3.581.074-5.996 2.793-6.255 6.279-.2 2.696 1.732 4.813 4.279 4.813 1.848 0 2.674-.543 3.605-1.395l-.007-.005Zm-1.946-1.382c-1.542 0-2.616-1.23-2.393-2.738.223-1.507 1.665-2.737 3.206-2.737 1.542 0 2.616 1.23 2.394 2.737-.223 1.508-1.664 2.738-3.207 2.738Zm11.685-7.971h-2.355c-.486 0-.683.362-.53.808l2.925 8.561-2.868 4.075c-.241.34-.054.65.284.65h2.647a.81.81 0 0 0 .786-.386l8.993-12.898c.277-.397.147-.814-.308-.814H67.6c-.43 0-.602.17-.848.527l-3.75 5.435-1.676-5.447c-.098-.33-.342-.511-.793-.511h-.002Z"
                        fill="#113984"
                      ></path>
                      <path
                        d="M79.768 5.542c2.368 0 4.553 1.284 4.254 4.485-.363 3.805-2.4 5.91-5.616 5.919h-2.808c-.404 0-.6.33-.705 1.005l-.543 3.455c-.082.522-.35.779-.745.779h-2.614c-.417 0-.562-.267-.47-.863l2.162-13.85c.107-.68.362-.934.828-.934h6.257v.004Zm-4.257 7.413h2.128c1.332-.051 2.216-.973 2.305-2.636.054-1.027-.64-1.763-1.743-1.757l-2.004.009-.686 4.384Zm15.618 7.17c.239-.217.482-.33.447-.062l-.085.642c-.044.335.089.512.4.512h2.323c.391 0 .581-.157.677-.762l1.431-8.982c.073-.451-.038-.672-.38-.672h-2.55c-.23 0-.343.128-.403.48l-.094.552c-.049.288-.181.34-.304.05-.433-1.026-1.538-1.486-3.08-1.45-3.582.074-5.997 2.793-6.256 6.279-.199 2.696 1.732 4.813 4.28 4.813 1.847 0 2.673-.543 3.604-1.395l-.01-.005Zm-1.944-1.382c-1.542 0-2.616-1.23-2.393-2.738.222-1.507 1.665-2.737 3.206-2.737 1.542 0 2.616 1.23 2.393 2.737-.223 1.508-1.665 2.738-3.206 2.738Zm10.712 2.489h-2.681a.317.317 0 0 1-.328-.362l2.355-14.92a.462.462 0 0 1 .445-.363h2.682a.317.317 0 0 1 .327.362l-2.355 14.92a.462.462 0 0 1-.445.367v-.004Z"
                        fill="#009EE3"
                      ></path>
                      <path
                        d="M4.572 0h7.026c1.978 0 4.326.063 5.895 1.45 1.049.925 1.6 2.398 1.473 3.985-.432 5.364-3.64 8.37-7.944 8.37H7.558c-.59 0-.98.39-1.147 1.449l-.967 6.159c-.064.399-.236.634-.544.663H.565c-.48 0-.65-.362-.525-1.163L3.156 1.17C3.28.377 3.717 0 4.572 0Z"
                        fill="#113984"
                      ></path>
                      <path
                        d="m6.513 14.629 1.226-7.767c.107-.68.48-1.007 1.223-1.007h7.018c1.161 0 2.102.181 2.837.516-.705 4.776-3.793 7.428-7.837 7.428H7.522c-.464.002-.805.234-1.01.83Z"
                        fill="#172C70"
                      ></path>
                    </g>
                  </svg>
                </span>
              </h2>
              <div
                id="collapsePP"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionPayment"
              >
                <div class="accordion-body">
                  <div class="px-2 col-lg-6 mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="card position-sticky top-0">
            <div class="p-3 bg-light bg-opacity-10">
              <h6 class="card-title mb-3">Order Summary</h6>
              <div class="d-flex justify-content-between mb-1 ">
                <span>Subtotal</span>{" "}
                <span>
                  {sumarizeOrder().toLocaleString()}{" "}
                  <i class="fa-solid fa-dong-sign"></i>
                </span>
              </div>

              <hr />
              <div class="d-flex justify-content-between mb-4 ">
                <span>TOTAL</span>{" "}
                <strong class="text-dark">
                  {sumarizeOrder().toLocaleString()}{" "}
                  <i class="fa-solid fa-dong-sign"></i>
                </strong>
              </div>

              <button
                class="btn btn-primary w-100 mt-2"
                onClick={(e) => handleClick(e)}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
