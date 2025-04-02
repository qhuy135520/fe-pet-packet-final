import "@/styles/become-a-partner/upgrade-rejected.css";
import formatDate from "@/utils/formatDate";
export default function UpgradeRejected({ requestDate }) {
  function calDate() {
    if (requestDate != null) {
      const date = new Date(requestDate);

      date.setDate(date.getDate() + 15);

      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      return date.toLocaleDateString("en-US", options);
    }
  }
  return (
    <div className="upgrade-rejected">
      <div className="lock"></div>
      <div className="message">
        <h1>Your request has been rejected.</h1>
        <h3 className="text-center">
          Please try again after: &nbsp;
          <span className="text-danger">{calDate()}</span>
        </h3>
      </div>
    </div>
  );
}
