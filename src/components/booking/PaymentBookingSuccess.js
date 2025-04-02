"use client";

import { useSession } from "next-auth/react";

export default function PaymentBookingSuccess({text, link}) {
  const { data: session, status } = useSession();
  function handleClick(e) {
    if (session?.user) {
      window.location.href = `/${link}/${session.user.userId}`;
    }
  }
  return (
    <>
      <div className="row justify-content-center payment-success">
        <div className="col-md-5">
          <div className="message-box _success">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            <h2> Your {text} was successful </h2>
            <p>
              Thank you for your {text}. we will <br />
              be in contact with more details shortly{" "}
            </p>
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
