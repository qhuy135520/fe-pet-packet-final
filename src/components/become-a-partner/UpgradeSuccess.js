"use client";
import refreshSession from "@/library/refreshSession";
import { unauthenticate } from "@/utils/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "@/styles/payment/payment.css"

export default function UpgradeSuccess() {
  const router = useRouter();

  async function handleClick(e) {
    e.preventDefault();
    await unauthenticate();
    await refreshSession();
    router.push("/signin");
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      await unauthenticate();
      await refreshSession();
      router.push("/signin");
      toast.info(
        <div>
          <strong>Logout successful</strong>
          <p>After upgrade user you need to login again!</p>
        </div>,
        {
          theme: "light",
        }
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="row justify-content-center payment-success">
        <div className="col-md-5">
          <div className="message-box _success">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            <h2> Your Request was successful </h2>
            <p>
              Thank you for your participation. we will <br />
              be in contact with more details shortly
            </p>
            <button
              className="button-33 mt-3"
              onClick={(e) => handleClick(e)}
              role="button"
            >
              Click here to Sign In again!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
