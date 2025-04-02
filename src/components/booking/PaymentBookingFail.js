"use client";

import { useSession } from "next-auth/react";

export default function PaymentBookingFail() {
  const { data: session, status } = useSession();
  function handleClick(e) {
    if (session?.user) {
      window.location.href = `/history-booking/${session.user.userId}`;
    }
  }
  return (
    <>
      <div className="row justify-content-center payment-fail">
        <div className="col-md-5">
          <div className="message-box _success _failed">
            <i className="fa fa-times-circle" aria-hidden="true"></i>
            <h2> Your payment failed </h2>
            <p> Try again later </p>
            <button
              className="button-33 mt-3"
              onClick={(e) => handleClick(e)}
              role="button"
            >
              Click here to Show your list again!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
