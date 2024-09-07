"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import SocialWrap from "../../../components/SocialWrap";
import { authenticate } from "../../../utils/action";
import refreshSession from "@/library/refreshSession";

export default function LoginForm() {
  const router = useRouter();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const formInput = { ...state };
    formInput[e.target.name] = e.target.value;
    setState(formInput);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await authenticate(state.username, state.password);

    // Check Username and Password
    if (res?.error) {
      toast.error(
        <div>
          <strong>Error Login</strong>
          <p style={{ color: "white" }}>{res?.error}</p>
        </div>,
        {
          theme: "dark",
        }
      );
    } else {
      localStorage.setItem("loginSuccessful", "true");
      window.location.href = "/home";
    }
  }

  return (
    <>
      <div className="form-inner">
        <h1 className="title">LOGIN</h1>
        <p className="caption mb-4">
          Please enter your login details to sign in.
        </p>

        <form action="#" className="pt-3">
          <div className="form-group form-floating ">
            <span className="has-float-label">
              <label htmlFor="username">Username/Password</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username/Password"
                name="username"
                value={state.username}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
              />
            </span>
          </div>

          <div className="form-group form-floating">
            <span className="has-float-label">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={state.password}
                onChange={(e) => handleChange(e)}
              />
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
              />
              <label htmlFor="remember" className="form-check-label">
                Keep me logged in
              </label>
            </div>
            <div>
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
          </div>

          <div className="d-grid mb-4">
            <button
              onClick={(e) => handleSubmit(e)}
              className="btn btn-primary btn-block"
            >
              Log in
            </button>
          </div>

          <div className="mb-2">
            Don’t have an account? <Link href="/signup">Sign up</Link>
          </div>

          <SocialWrap />
        </form>
      </div>
    </>
  );
}
