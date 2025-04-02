import React from "react";

export default function Bookings({ bookings }) {
  return (
    <>
      {/* Banner start */}
      <div
        className="blog-details-hero set-bg"
        data-setbg="img/blog/details/blog-hero.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="blog__hero__text">
                <div className="label">
                  <i className="fa fa-clock-o" />{" "}
                </div>
                <h2>My Bookings</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner end */}

      {/* Bookings List */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Booking List</h5>
              </div>
              <div className="card-body">
                {bookings && bookings.length > 0 ? (
                  <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Service Name</th>
                        <th>Booking Date</th>
                        <th>Appointment Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, index) => (
                        <tr key={booking.bookingId}>
                          <td>{index + 1}</td>
                          <td>{booking.service.serviceCategory.name}</td>
                          <td>
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </td>
                          <td>
                            {new Date(
                              booking.appointmentDate
                            ).toLocaleDateString()}
                          </td>
                          <td className="text-capitalize">{booking.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center">No bookings available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
