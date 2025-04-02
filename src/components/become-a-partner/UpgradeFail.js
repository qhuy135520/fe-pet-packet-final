import "@/styles/payment/payment.css"

export default function UpgradeFail() {
  return (
    <div className="row justify-content-center payment-fail">
      <div className="col-md-5">
        <div className="message-box _success _failed">
          <i className="fa fa-times-circle" aria-hidden="true"></i>
          <h2> Your request failed </h2>
          <p> Try again later </p>
        </div>
      </div>
    </div>
  );
}
