import React from "react";
import { sendRequest } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Review({
  reviews,
  setTabServiceDetail,
  setTabService,
}) {
  const router = useRouter(); // Initialize router

  // Handler to delete review
  const deleteReview = async (reviewId) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reviews/${reviewId}`;

      const response = await sendRequest({
        url: endpoint,
        method: "DELETE",
      });

      if (response?.statusCode === 200) {
        toast.success("Review deleted successfully!");
        // Optionally, refresh the reviews list or update state dynamically
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error("Error deleting review:", response.message);
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("Failed to delete review. Please try again.");
    }
  };

  function HandleClickBack() {
    setTabServiceDetail(false);
    setTabService(true);
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
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Reviews</div>
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
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Rating</th>
              <th scope="col">Review Text</th>
              <th scope="col">Review Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.reviewId}>
                <th scope="row">{index + 1}</th>
                <td>{review.user?.username || "N/A"}</td>
                <td>{review.user?.name || "N/A"}</td>
                <td>{review.rating || "N/A"}</td>
                <td>{review.reviewText || "N/A"}</td>
                <td>
                  {review.reviewDate
                    ? new Date(review.reviewDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteReview(review.reviewId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
