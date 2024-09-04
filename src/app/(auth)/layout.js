"use client";
import { usePathname, useRouter } from "next/navigation";
import signInStyles from "/src/styles/signin/signin-style.module.css";
import signupStyles from "/src/styles/signup/signup-style.module.css";
import verifyOtpStyles from "/src/styles/verify-otp/verify-otp-style.module.css";
import "/src/styles/auth.css";

export default function AuthenLayout({ children }) {
  const router = useRouter();

  const pathname = usePathname();
  const currentPath = pathname || "";
  console.log(pathname);
  return (
    <>
      <div
        className={`${
          currentPath === "/signin"
            ? signInStyles["site-wrap-signin"]
            : currentPath === "/signup"
            ? signupStyles["site-wrap-signup"]
            : currentPath === "/verify-otp-signup"
            ? verifyOtpStyles["site-wrap-verify-otp"]
            : ""
        } site-wrap d-md-flex`}
      >
        <div className="row mr-0 ml-0">
          <div
            className={`${
              currentPath === "/signin"
                ? signInStyles["bg-img-signin"]
                : currentPath === "/signup"
                ? signupStyles["bg-img-signup"]
                : currentPath === "/verify-otp-signup"
                ? verifyOtpStyles["bg-img-verify-otp"]
                : ""
            } bg-img col-md-7`}
          ></div>
          <div
            className={`
              ${
                currentPath === "/signin"
                  ? signInStyles["form-wrap-signin"]
                  : currentPath === "/signup"
                  ? signupStyles["form-wrap-signup"]
                  : currentPath === "/verify-otp-signup"
                  ? verifyOtpStyles["form-wrap-verify-otp"]
                  : ""
              } form-wrap col-md-5 pb-0`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
