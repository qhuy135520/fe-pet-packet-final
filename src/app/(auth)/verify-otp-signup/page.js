"use client";
import Link from "next/link";
import SocialWrap from "../../../components/SocialWrap";
import { useEffect, useRef, useState } from "react";
import { sendRequest } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function VerifyOtpSignup() {
  const [emailSignup, setEmailSignup] = useState("");
  const [otpSignup, setOtpSignup] = useState("");
  const checkOTPRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setEmailSignup(localStorage.getItem("emailSignup"));
  }, []);

  function handleChange(e) {
    setOtpSignup(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (otpSignup.length == 0) {
      checkOTPRef.current.setCustomValidity("OTP is required!");
      checkOTPRef.current.reportValidity();
    } else {
      const res = await sendRequest({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp-signup`,
        body: {
          email: emailSignup,
          otp: otpSignup,
          useCredentials: true,
        },
      });
      if (res?.error) {
        toast.error(
          <div>
            <strong>Error Sign Up</strong>
            <p style={{ color: "white" }}>{res?.message}</p>
          </div>,
          {
            theme: "dark",
          }
        );
      } else {
        router.push("/signin");
        localStorage.removeItem("emailSignup");
        toast.success(
          <div>
            <strong>Registration successful</strong>
            <p>Please log in again to experience the system!</p>
          </div>,
          {
            theme: "light",
          }
        );
      }
    }
  }
  return (
    <>
      <div className="form-inner">
        <h1 className="title">SIGN UP</h1>
        <p className="caption mb-4">Create your account in seconds.</p>
        <h4 className="">We have sent OTP to your gmail: </h4>
        <h5 style={{ textAlign: "" }}>{emailSignup}</h5>
        <form action="#" className="pt-3">
          <div className="form-group form-floating ">
            <span className="has-float-label">
              <label htmlFor="otp">OTP</label>
              <input
                ref={checkOTPRef}
                type="text"
                className="form-control"
                id="otp"
                placeholder="Enter OTP"
                name="otp"
                autoComplete="off"
                value={otpSignup}
                onChange={(e) => handleChange(e)}
              />
            </span>
          </div>
          <div className="d-grid mb-4">
            <button
              onClick={(e) => handleSubmit(e)}
              className="btn btn-primary btn-block"
            >
              Confirm
            </button>
          </div>
          <div className="mb-2">
            Already a member? <Link href="/signin">Log in</Link>
          </div>
          <SocialWrap />
        </form>
      </div>
    </>
  );
}
