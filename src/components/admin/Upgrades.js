import React from "react";
import { sendRequest } from "@/utils/api"; // Ensure this is imported
import { toast } from "react-toastify"; // Ensure this is imported

export default function Upgrades({ upgrades }) {
  // Handler to confirm the upgrade request
  const handleConfirmRequest = async (upgradeRequestId) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/upgrades/confirm/${upgradeRequestId}`;

      const response = await sendRequest({
        url: endpoint,
        method: "PUT",
      });

      if (response?.statusCode === 200) {
        toast.success("Confirmed upgrade successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error("Error upgrading request:", response.message);
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("Failed to upgrade request. Please try again.");
    }
  };

  // Handler to reject the upgrade request
  const handleRejectRequest = async (upgradeRequestId) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/upgrades/reject/${upgradeRequestId}`;

      const response = await sendRequest({
        url: endpoint,
        method: "PUT",
      });

      if (response?.statusCode === 200) {
        toast.success("Rejected upgrade successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error("Error rejecting request:", response.message);
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("Failed to reject request. Please try again.");
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "badge bg-warning text-dark"; // Yellow
      case "accepted":
        return "badge bg-success"; // Green
      case "rejected":
        return "badge bg-danger"; // Red
      default:
        return "badge bg-secondary"; // Gray
    }
  };

  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Upgrade Requests
        </div>
      </div>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Request Date</th>
              <th scope="col">Approved Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {upgrades.map((upgrade, index) => (
              <>
                <tr key={upgrade.upgradeRequestId}>
                  <th scope="row">{index + 1}</th>
                  <td>{upgrade.user?.username || "N/A"}</td>
                  <td>{upgrade.user?.name || "N/A"}</td>
                  <td>
                    {upgrade.requestDate
                      ? new Date(upgrade.requestDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    {upgrade.approvedDate
                      ? new Date(upgrade.approvedDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(upgrade.status)}>
                      {upgrade.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm mr-2"
                      data-toggle="modal"
                      data-target={`#modal${upgrade.upgradeRequestId}`}
                    >
                      View License
                    </button>
                    {upgrade.status == "pending" && (
                      <>
                        <button
                          type="button"
                          className="btn btn-success btn-sm mr-2"
                          onClick={() =>
                            handleConfirmRequest(upgrade.upgradeRequestId)
                          }
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleRejectRequest(upgrade.upgradeRequestId)
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <div
                  class="modal fade"
                  id={`modal${upgrade.upgradeRequestId}`}
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
              
                      <div class="modal-body">
                        <img src={`${upgrade.pictureTxt}`} alt=""/>
                      </div>
                   
                    </div>
                  </div>
                </div>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
