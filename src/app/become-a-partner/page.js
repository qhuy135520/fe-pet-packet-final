"use client";
import InComing from "@/components/become-a-partner/inComing";
import UpgradeRejected from "@/components/become-a-partner/UpgradeRejected";
import UpgradeSuccess from "@/components/become-a-partner/UpgradeSuccess";
import Preloder from "@/components/Preloder";
import "@/styles/become-a-partner/become-a-partner.css";
import { sendRequest } from "@/utils/api";
import { uploadImage } from "@/utils/upload";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
export default function BecomeAPartner() {
  const checkAccountNumberRef = useRef(null);
  const checkAccountNameRef = useRef(null);
  const checkReleaseMonthRef = useRef(null);
  const checkReleaseYearRef = useRef(null);
  const checkPictureTxtRef = useRef(null);
  const checkBankNameRef = useRef(null);

  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [userUpgrade, setUserUpgrade] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [banks, setBanks] = useState([]);
  const [upgradeRequest, setUpgradeRequest] = useState(null);
  const [paymentInformation, setPaymentInformation] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    releaseMonth: "",
    releaseYear: "",
    userId: "",
    pictureTxt: "",
  });
  const [cities, setCities] = useState([]);
  function handleChange(e) {
    const formInput = { ...paymentInformation };
    formInput[e.target.name] = e.target.value;
    setPaymentInformation(formInput);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const checkAccountNumber = paymentInformation.accountNumber;
    const checkBankName = paymentInformation.bankName;
    const checkAccountName = paymentInformation.accountName;
    const checkReleaseMonth = paymentInformation.releaseMonth;
    const checkReleaseYear = paymentInformation.releaseYear;
    const checkPictureTxt = image;

    if (
      checkAccountNumber.length > 19 ||
      checkAccountNumber.length < 16 ||
      isNaN(checkAccountNumber)
    ) {
      checkAccountNumberRef.current.setCustomValidity(
        "Account number is greater than 15 and less than 20!"
      );
      checkAccountNumberRef.current.reportValidity();
    } else if (checkBankName.length === 0 || checkBankName == "") {
      checkBankNameRef.current.setCustomValidity("Bank name is required!");
      checkBankNameRef.current.reportValidity();
    } else if (checkAccountName.length === 0 || checkAccountName.length > 30) {
      checkAccountNameRef.current.setCustomValidity(
        "Account name is required!"
      );
      checkAccountNameRef.current.reportValidity();
    } else if (
      checkReleaseMonth.length !== 2 ||
      checkReleaseMonth > 12 ||
      checkReleaseMonth < 1
    ) {
      checkReleaseMonthRef.current.setCustomValidity(
        "Release Month is not in correct format!"
      );
      checkReleaseMonthRef.current.reportValidity();
    } else if (
      checkReleaseYear.length != 2 ||
      checkReleaseYear < 0 ||
      checkReleaseYear > 100
    ) {
      checkReleaseYearRef.current.setCustomValidity(
        "Release Year is not in correct format!"
      );
      checkReleaseYearRef.current.reportValidity();
    } else if (checkPictureTxt == null) {
      checkPictureTxtRef.current.setCustomValidity("Certificate is required!");
      checkPictureTxtRef.current.reportValidity();
    } else {
      setLoading(true);
      const pictureUrl = await uploadImage(image);
      const formInput = await { ...paymentInformation };
      formInput["pictureTxt"] = await pictureUrl;
      try {
        const res = await sendRequest({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/upgrade-user/${paymentInformation.userId}`,
          body: formInput,
        });

        window.location.reload();

        // const resUpgradeRequest = await sendRequest({
        //   url: `${process.env.NEXT_PUBLIC_API_URL}/api/upgrade-request/${session.user.userId}`,
        //   method: "GET",
        // });
        // setUpgradeRequest(resUpgradeRequest.data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    async function fetchProvinces() {
      if (session) {
        const userId = await session.user.userId;

        const formInput = { ...paymentInformation };
        formInput["userId"] = userId;
        setPaymentInformation(formInput);
        setUserUpgrade(session.user);
      }
      try {
        const resCities = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/cities`,
        });
        setCities(resCities.data);

        const resBanks = await sendRequest({
          url: "https://api.vietqr.io/v2/banks",
          method: "GET",
        });
        setBanks(resBanks.data);

        setLoadingUser(false);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    }

    fetchProvinces();
  }, [session]);

  useEffect(() => {
    async function fetchUpgradeRequest() {
      try {
        if (session?.user) {
          const resUpgradeRequest = await sendRequest({
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/upgrade-request/${session.user.userId}`,
            method: "GET",
          });
          setUpgradeRequest(resUpgradeRequest.data);
          setLoadingRequest(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchUpgradeRequest();
  }, [session]);

  if (loadingUser || loadingRequest) {
    return <Preloder />;
  }

  if (upgradeRequest?.status === "pending") {
    return <InComing />;
  }

  if (upgradeRequest?.status === "accepted") {
    return <UpgradeSuccess />;
  }

  if (upgradeRequest?.status === "rejected") {
    return <UpgradeRejected requestDate={upgradeRequest.requestDate} />;
  }
  if (loading) {
    return <Preloder />;
  }

  return (
    <>
      <div className="upgrade-user">
        <form>
          <div className="row">
            <h4>
              Account(Please check your information again, if anything is wrong
              please edit it in your profile)
            </h4>
            <div className="input-group input-group-icon">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                defaultValue={userUpgrade?.name}
                readOnly
              />
              <div className="input-icon">
                <i className="fa fa-user"></i>
              </div>
            </div>
            <div className="input-group input-group-icon">
              <input
                type="email"
                placeholder="Email Adress"
                name="email"
                defaultValue={userUpgrade?.email}
                readOnly
              />
              <div className="input-icon">
                <i className="fa fa-envelope"></i>
              </div>
            </div>
            <div className="input-group input-group-icon">
              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                defaultValue={userUpgrade?.phone}
                readOnly
              />
              <div className="input-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
            </div>
            <div className="input-group input-group-icon">
              <input name="city" defaultValue={userUpgrade.address} readOnly />
              {/* <select name="city" value={userUpgrade?.address}>
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.displayName}
                  </option>
                ))}
              </select> */}
              <div className="input-icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
            </div>
          </div>
          <div className="row">
            {/* <div className="col-half">
              <h4>Date of Birth</h4>
              <div className="input-group">
                <div className="col-third">
                  <input type="text" placeholder="DD" />
                </div>
                <div className="col-third">
                  <input type="text" placeholder="MM" />
                </div>
                <div className="col-third">
                  <input type="text" placeholder="YYYY" />
                </div>
              </div>
            </div> */}
            <div className="col-half">
              <h4>Gender</h4>
              <div className="input-group">
                <input
                  id="gender-male"
                  type="radio"
                  name="gender"
                  value="MALE"
                  disabled
                  defaultChecked={userUpgrade?.gender === "MALE"}
                />
                <label htmlFor="gender-male">Male</label>
                <input
                  id="gender-female"
                  type="radio"
                  name="gender"
                  value="FEMALE"
                  disabled
                  defaultChecked={userUpgrade?.gender !== "MALE"}
                />
                <label htmlFor="gender-female">Female</label>
              </div>
            </div>
          </div>
          <hr className="pb-3" />
          <div className="row">
            <h4>Payment Details(Enter your bank information)</h4>
            <div className="input-group">
              <input
                id="payment-method-card"
                type="radio"
                name="payment-method"
                value="card"
                required
                defaultChecked="true"
              />
              <label htmlFor="payment-method-card">
                <span>
                  <i className="fa fa-cc-visa"></i>Banking Information
                </span>
              </label>
              <input
                id="payment-method-paypal"
                type="radio"
                name="payment-method"
                value="paypal"
                required
              />
              <label htmlFor="payment-method-paypal">
                <span>
                  <i className="fa fa-cc-paypal"></i>Paypal
                </span>
              </label>
            </div>
            <div className="input-group input-group-icon">
              <input
                type="text"
                name="accountNumber"
                placeholder="Card Number"
                minLength={19}
                maxLength={19}
                onChange={(e) => handleChange(e)}
                title="Account number is not in correct format!"
                ref={checkAccountNumberRef}
              />
              <div className="input-icon">
                <i className="fa fa-credit-card"></i>
              </div>
            </div>
            <div className="input-group input-group-icon">
              <select
                name="bankName"
                onChange={(e) => handleChange(e)}
                ref={checkBankNameRef}
              >
                <option value={""} checked>
                  Select Bank
                </option>
                {banks.map((bank) => {
                  return (
                    <option key={bank.code} value={bank.code}>
                      {bank.code}
                    </option>
                  );
                })}
              </select>

              <div className="input-icon">
                <i className="fa fa-credit-card"></i>
              </div>
              <div className="input-icon">
                <i className="fa-solid fa-building-columns"></i>
              </div>
            </div>
            <div className="col-half">
              <div className="input-group input-group-icon">
                <input
                  type="text"
                  name="accountName"
                  placeholder="Account Name"
                  onChange={(e) => handleChange(e)}
                  ref={checkAccountNameRef}
                />
                <div className="input-icon">
                  <i className="fa fa-user"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              <h4 className="mt-3 mr-3">Release date</h4>
              <div>
                <input
                  type="number"
                  name="releaseMonth"
                  min={1}
                  max={12}
                  maxLength={2}
                  required
                  placeholder="MM"
                  onChange={(e) => handleChange(e)}
                  ref={checkReleaseMonthRef}
                />
              </div>
              <div>
                <input
                  type="number"
                  name="releaseYear"
                  min={1900}
                  max={2100}
                  maxLength={4}
                  placeholder="YYYY"
                  onChange={(e) => handleChange(e)}
                  ref={checkReleaseYearRef}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              <h4 className="mt-3 mr-3">Certificate:</h4>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
                ref={checkPictureTxtRef}
              />
              {preview && <img src={preview} alt="Preview" width={200} />}
            </div>
          </div>
          <div className="row">
            <h4>Terms and Conditions</h4>
            <div className="input-group">
              <input id="terms" type="checkbox" />
              <label htmlFor="terms">
                I accept the terms and conditions for signing up to this
                service, and hereby confirm I have read the privacy policy.
              </label>
            </div>
          </div>
          <div className="row">
            <button
              onClick={(e) => handleSubmit(e)}
              className="btn btn-lg"
              style={{ backgroundColor: "#ee7385", color: "#f9f9f9" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
