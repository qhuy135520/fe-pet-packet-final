import Link from "next/link";
import SocialWrap from "../../../components/SocialWrap";


export default async function VerifyOtpSignup() {
  
  return (
    <>
      <div className="form-inner">
        <h1 className="title">Sign Up</h1>
        <p className="caption mb-4">Create your account in seconds.</p>
        <h3 className="">We have sent otp to your gmail</h3>

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
              />
            </span>
          </div>
          <div className="d-grid mb-4">
            <button className="btn btn-primary btn-block">Confirm</button>
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
