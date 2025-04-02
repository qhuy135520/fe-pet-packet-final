import { sendRequest } from "@/utils/api";
import formatDate from "@/utils/formatDate";

export default function RevenueDetail({
  setTabRevenueDetail,
  setTabRevenue,
  revenue,
}) {
  function HandleClickBack() {
    setTabRevenueDetail(false);
    setTabRevenue(true);
  }
  async function handleSetPaid() {
    try {
      const res = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/revenue-management/set-paid/${revenue[0].booking.service.user.userId}`,
        method: "POST",
      });
      if (res) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }
  function calculateRevenuePaid() {
    let amount = 0;
    revenue.map((item) => {
      if (item.status == "unpaid") {
        amount += item.amount;
      }
    });
    return amount;
  }
  function calculateAmount() {
    let amount = 0;
    revenue.map((item) => {
      if (item.status == "unpaid") {
        amount += item.booking.transaction.amountPaid;
      }
    });
    return amount;
  }
  function calculateCommission() {
    let amount = 0;
    revenue.map((item) => {
      if (item.status == "unpaid") {
        amount += item.booking.transaction.amountPaid - item.amount;
      }
    });
    return amount;
  }
  return (
    <div style={{ flex: 1, padding: "20px" }}>
      {/* Top Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Revenue Detail
        </div>
      </div>
      <div>
        <p className="text-dark">
          You are looking for Revenue Detail Of{" "}
          <span className="text-danger">
            {revenue[0]?.booking.service.user.name} -{" "}
            {revenue[0]?.booking.service.user.username}
          </span>
        </p>
        <p>
          Bank:{revenue[0]?.booking.service.user.paymentInformation.bankName} -{" "}
          {revenue[0]?.booking.service.user.paymentInformation.accountNumber}
        </p>
        <p></p>
      </div>
      {/* Main Content */}
      <div>
        <div>
          <button
            className="button-56"
            role="button"
            type="button"
            onClick={(e) => HandleClickBack(e)}
          >
            Back&nbsp;&nbsp;<i className="fa-solid fa-backward"></i>
          </button>
          <button
            className="button-56"
            role="button"
            type="button"
            onClick={(e) => handleSetPaid(e)}
          >
            Set Paid&nbsp;&nbsp;<i className="fa-solid fa-backward"></i>
          </button>
        </div>

        <table className="table text-center table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Booked Date</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Commission</th>
              <th scope="col">Refund</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {revenue.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDate(item.booking.bookingDate)}</td>
                  <td>{formatDate(item.booking.startDate)}</td>
                  <td>{formatDate(item.booking.endDate)}</td>
                  <td>
                    {item.booking.transaction.amountPaid.toLocaleString()}
                  </td>
                  <td>
                    {(
                      item.booking.transaction.amountPaid - item.amount
                    ).toLocaleString()}
                  </td>
                  <td>{item.amount.toLocaleString()}</td>
                  <td>{item.status}</td>
                </tr>
              );
            })}
            <tr>
              <td>{revenue.length + 1}</td>
              <td></td>
              <td></td>
              <td>Total:</td>
              <td>{calculateAmount().toLocaleString()}</td>
              <td>{calculateCommission().toLocaleString()}</td>
              <td>{calculateRevenuePaid().toLocaleString()}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
