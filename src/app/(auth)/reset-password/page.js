"use client";
import Link from "next/link";
import SocialWrap from "../../../components/SocialWrap";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  function handleChange(e) {
    const formInput = { ...state };
    formInput[e.target.name] = e.target.value;
    setState(formInput);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await sendRequest({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
      body: {
        email: state.email,
        newPassword: state.password,
        confirmPassword: state.confirmPassword,
        useCredentials: true,
      },
    });
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
      router.push("/sign-in");
      toast.success(
        <div>
          <strong>Reset Password Successful</strong>
          <p>Please log in again to experience the system!</p>
        </div>,
        {
          theme: "light",
        }
      );
    }
  }
  return (
    <>
      <div className="form-inner">
        <h1 className="title">RESET PASSWORD</h1>
        <p className="caption mb-4">Reset your account in seconds.</p>

        <form action="#" className="pt-3">
          <div className="form-group form-floating ">
            <span className="has-float-label">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                name="email"
                autoComplete="off"
                value={state.email}
                onChange={(e) => handleChange(e)}
              />
            </span>
          </div>
          <div className="form-group form-floating ">
            <span className="has-float-label">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                name="password"
                autoComplete="off"
                value={state.password}
                onChange={(e) => handleChange(e)}
              />
            </span>
          </div>
          <div className="form-group form-floating ">
            <span className="has-float-label">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Enter Password Again"
                name="confirmPassword"
                autoComplete="off"
                value={state.confirmPassword}
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
