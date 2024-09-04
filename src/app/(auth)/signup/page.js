"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialWrap from "../../../components/SocialWrap";
import { useRef, useState } from "react";

export default function SignUp() {

  const confirmPasswordRef = useRef(null)

  const [state, setState] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const route = useRouter();

  function handleChange(e) {
    const formInput = { ...state };
    formInput[e.target.name] = e.target.value;
    setState(formInput);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const password = state.password
    const confirmPassword = state.confirmPassword

    if (password !== confirmPassword) {
      confirmPasswordRef.current.setCustomValidity("Passwords do not match");
    } else {
      confirmPasswordRef.current.setCustomValidity("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify(state),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(state)
      if(res.ok){
        
        route.push('/verify-otp-signup')
      }
      ;
    }
  }

  return (
    <>
      <div className="form-inner">
        <h1 className="title">Sign up</h1>
        <p className="caption mb-4">Create your account in seconds.</p>

        <form onSubmit={(e) => handleSubmit(e)} className="pt-3">
          <div className="form-floating form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Full Name"
              name="fullName"
              required
              pattern="[A-Za-z\s]+"
              onChange={(e) => handleChange(e)}
              title="Full Name can only contain letters and spaces"
            />
          </div>
          <div className="form-floating form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              name="username"
              minlength="6"
              required
              onChange={(e) => handleChange(e)}
              title="Username must contain at least 6 characters"
            />
          </div>
          <div className="form-floating form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="info@example.com"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="form-floating form-row">
            <div className="col">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                placeholder="Phone Number"
                name="phone"
                required
                onChange={(e) => handleChange(e)}
                pattern="0\d{9}"
                title="Phone Number must be 10 digits and start with 0"
              />
            </div>
            <div className="col">
              <label htmlFor="address">Adress</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Address"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="0"
              required
              onChange={(e) => handleChange(e)}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="1"
              required
              onChange={(e) => handleChange(e)}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-floating form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              required
              minlength="6"
              onChange={(e) => handleChange(e)}
              title="Password must contain at least 6 characters"
            />
          </div>
          <div className="form-floating form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              minlength="6"
              onChange={(e) => handleChange(e)}
              title="Password must contain at least 6 characters"
              ref={confirmPasswordRef}
            />
          </div>
          <div className="d-flex justify-content-between">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
                required
              />
              <label htmlFor="remember" className="form-check-label">
                I agree to the <a href="#">Terms of Service</a> and
                <a href="#">Privacy Policy</a>
              </label>
            </div>
          </div>

          <div className="d-grid mb-4">
            <button type="submit" className="btn btn-primary btn-block">
              Create an account
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
