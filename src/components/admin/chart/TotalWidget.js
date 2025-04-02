export default function TotalWidget({ users, commission, booking, service }) {
  return (
    <>
      <div className="row widget-admin">
        <div className="col-md-3">
          <div className="card l-bg-cherry">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div className="mb-4">
                <h5 className="card-title mb-0">Booking Resolved</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">
                    {booking.length}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card l-bg-blue-dark">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-users"></i>
              </div>
              <div className="mb-4">
                <h5 className="card-title mb-0">Accounts</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">
                    {users.length}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card l-bg-green-dark">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-ticket-alt"></i>
              </div>
              <div className="mb-4">
                <h5 className="card-title mb-0">Service Resolved</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">
                    {service.length}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card l-bg-orange-dark">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="mb-4">
                <h5 className="card-title mb-0">Revenue</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">
                    {commission.toLocaleString()}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
