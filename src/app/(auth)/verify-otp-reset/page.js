"use client";
import Link from "next/link";
import SocialWrap from "../../../components/SocialWrap";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function VerifyOtpReset() {
  const [emailResetPassword, setEmailResetPassword] = useState("");
  const [otpResetPassword, setOtpSignup] = useState("");
  const router = useRouter();

  useEffect(() => {
    setEmailResetPassword(localStorage.getItem("emailResetPassword"));
  }, []);

  function handleChange(e) {
    setOtpSignup(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await sendRequest({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp-reset-password`,
      body: {
        email: emailResetPassword,
        otp: otpResetPassword,
        useCredentials: true,
      },
    });
    console.log(res);
    if (res?.error) {
      toast.error(
        <div>
          <strong>Error Reset Password</strong>
          <p style={{ color: "white" }}>{res?.message}</p>
        </div>,
        {
          theme: "dark",
        }
      );
    } else {
      router.push("/reset-password");
      localStorage.removeItem("emailResetPassword");
    }
  }
  return (
    <>
      <div className="form-inner">
        <h1 className="title">RESET PASSWORD</h1>
        <p className="caption mb-4">Reset your account in seconds.</p>
        <h4 className="">We have sent OTP to your gmail: </h4>
        <h5 style={{ textAlign: "" }}>{emailResetPassword}</h5>
        <form action="#" className="pt-3">
          <div className="form-group form-floating ">
            <span className="has-float-label">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                placeholder="Enter OTP"
                name="otp"
                autoComplete="off"
                value={otpResetPassword}
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
