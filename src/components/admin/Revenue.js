import { sendRequest } from "@/utils/api";

export default function Revenue({
  users,
  setRevenue,
  setLoading,
  setTabRevenueDetail,
  setTabRevenue,
}) {
  async function handleOnclick(userId) {
    try {
      setLoading(true);
      const resBooking = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/revenue-management/${userId}`,
        method: "GET",
      });
      if (resBooking) {
        let sorted = resBooking.data.sort(function (a, b) {
          if (a.booking.transaction.status == "paid") {
            return 1;
          } else {
            return -1;
          }
        });
        setRevenue(sorted);
        setTabRevenue(false);
        setTabRevenueDetail(true);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
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
          Revenue Management
        </div>
      </div>

      {/* Main Content */}
      <div>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Bank Name</th>
              <th scope="col">Account Name</th>
              <th scope="col">Account Number</th>
              <th scope="col">Amount</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.user.username}</td>
                  <td>{item.user.name}</td>
                  <td>{item.user.email}</td>
                  <td>{item.user.paymentInformation.bankName}</td>
                  <td>{item.user.paymentInformation.accountName}</td>
                  <td>{item.user.paymentInformation.accountNumber}</td>
                  <td>{item.amount.toLocaleString()}</td>
                  <td>{item.totalAmount.toLocaleString()}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    className="text-info"
                    onClick={() => handleOnclick(item.user.userId)}
                  >
                    <i className="fa-solid fa-eye"></i> View Detail
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
