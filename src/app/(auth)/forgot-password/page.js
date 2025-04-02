"use client";
import Link from "next/link";
import SocialWrap from "../../../components/SocialWrap";
import { useEffect, useRef, useState } from "react";
import { sendRequest } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function VerifyOtpSignup() {
  const [email, setEmail] = useState("");

  const checkEmailRef = useRef(null);

  const router = useRouter();

  function handleChange(e) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (email.length == 0) {
      checkEmailRef.current.setCustomValidity("Username is required!");
      checkEmailRef.current.reportValidity();
    } else {
      const res = await sendRequest({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        body: {
          email: email,
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
        setEmail("");
      } else {
        router.push("/verify-otp-reset");
        localStorage.setItem("emailResetPassword", email);
      }
    }
  }
  return (
    <>
      <div className="form-inner">
        <h1 className="title">RESET PASSWORD</h1>
        <p className="caption mb-4">
          Please enter your email to Reset Password
        </p>
        <form action="#" className="pt-3">
          <div className="form-group form-floating ">
            <span className="has-float-label">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                ref={checkEmailRef}
                placeholder="Enter Email"
                name="email"
                autoComplete="off"
                value={email}
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
