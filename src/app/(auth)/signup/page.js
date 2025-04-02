"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialWrap from "../../../components/SocialWrap";
import { useEffect, useRef, useState } from "react";
import { sendRequest } from "@/utils/api";
import { toast } from "react-toastify";
import Preloder from "@/components/Preloder";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const checkNameRef = useRef(null);
  const checkUsernameRef = useRef(null);
  const checkPhoneRef = useRef(null);
  const checkEmailRef = useRef(null);
  const checkCityRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const checkPasswordRef = useRef(null);

  const route = useRouter();

  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const res = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/cities`,
        });
        setCities(res.data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    }

    fetchProvinces();
  }, []);

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    gender: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const formInput = { ...state };
    formInput[e.target.name] = e.target.value;
    setState(formInput);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const pattern = /^[a-zA-Z0-9À-ỹ\s]*$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const patternPhone = /^0\d{9}$/;

    const password = state.password;
    const confirmPassword = state.confirmPassword;
    if (
      state.name.length == 0 ||
      !pattern.test(state.name) ||
      state.name.length > 30
    ) {
      checkNameRef.current.setCustomValidity("Invalid Name");
      checkNameRef.current.reportValidity();
    } else if (state.username.length == 0) {
      checkUsernameRef.current.setCustomValidity("Username is required!");
      checkUsernameRef.current.reportValidity();
    } else if (state.email.length == 0 || !emailPattern.test(state.email)) {
      checkEmailRef.current.setCustomValidity("Invalid Email");
      checkEmailRef.current.reportValidity();
    } else if (state.phone.length != 10 || !patternPhone.test(state.phone)) {
      checkPhoneRef.current.setCustomValidity("Invalid Phone Number!");
      checkPhoneRef.current.reportValidity();
    } else if (state.city.length == 0) {
      checkCityRef.current.setCustomValidity("City is required!");
      checkCityRef.current.reportValidity();
    } else if (password.length < 6) {
      checkPasswordRef.current.setCustomValidity("Invalid Password!");
      checkPasswordRef.current.reportValidity();
    } else if (password != confirmPassword) {
      confirmPasswordRef.current.setCustomValidity("Passwords do not match!");
      confirmPasswordRef.current.reportValidity();
    } else {
      setLoading(true);
      const res = await sendRequest({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        body: state,
        useCredentials: true,
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
        setState({
          name: "",
          email: "",
          phone: "",
          city: "",
          gender: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        setLoading(false);
      } else {
        localStorage.setItem("emailSignup", state.email);
        route.push("/verify-otp-signup");
      }
    }
  }
  if (loading) {
    return <Preloder />;
  }

  return (
    <>
      <div className="form-inner">
        <h1 className="title">Sign up</h1>
        <p className="caption mb-4">Create your account in seconds.</p>

        <form className="pt-3">
          <div className="form-floating form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Full Name"
              ref={checkNameRef}
              name="name"
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
              ref={checkUsernameRef}
              minLength="6"
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
              ref={checkEmailRef}
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
                ref={checkPhoneRef}
                required
                onChange={(e) => handleChange(e)}
                pattern="0\d{9}"
                title="Phone Number must be 10 digits and start with 0"
              />
            </div>
            <div className="col">
              <label htmlFor="city">City</label>
              <select
                id="city"
                name="city"
                className="form-control"
                required
                ref={checkCityRef}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select your province</option>
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.displayName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="MALE"
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
              value="FEMALE"
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
              minLength="6"
              ref={checkPasswordRef}
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
              minLength="6"
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
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={(e) => handleSubmit(e)}
            >
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
