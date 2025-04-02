"use client";
import PaymentBookingSuccess from "@/components/booking/PaymentBookingSuccess";
import PetInfo from "@/components/booking/PetInfo";
import ServiceDetailInfo from "@/components/booking/ServiceDetailInfo";
import SummaryInfo from "@/components/booking/SummaryInfo";
import Preloder from "@/components/Preloder";
import "@/styles/booking/booking.css";
import { sendRequest } from "@/utils/api";
import "@/styles/payment/payment.css";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "public/css/jquery-ui.min.css";
import { useEffect, useState } from "react";
import "react-datetime/css/react-datetime.css";
import "rsuite/dist/rsuite.min.css";

export default function BookingService({ params }) {
  const { data: session, status } = useSession();
  const [indexTab, setIndexTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [booking, setBooking] = useState(null);
  const router = useRouter();
  const [transaction, setTransaction] = useState(null);
  const [petType, setPetType] = useState(null);
  const [success, setSuccess] = useState(false);
  const [availableBooking, setAvailableBooking] = useState(null);

  const [inputBooking, setInputBooking] = useState({
    serviceId: params.serviceId,
    note: "",
    session: "",
    userId: "",
    startDate: "",
    serviceDetailId: "",
    serviceAddonId: "",
    petNum: "",
    petType: "",
    discount: 0,
  });

  async function handleChange(e) {
    const formInput = { ...inputBooking };
    formInput[e.target.name] = e.target.value;
    setInputBooking(formInput);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let formInput;
    if (session) {
      formInput = await { ...inputBooking };
      formInput["userId"] = await session.user.userId;
      await setInputBooking(formInput);
    }
    const resBooking = await sendRequest({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/booking`,
      method: "POST",
      body: formInput,
    });

    if (resBooking) {
      setSuccess(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const resService = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/${params.serviceId}`,
        method: `GET`,
      });
      setService(resService.data);

      const resPetType = await sendRequest({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/types`,
      });
      setPetType(resPetType.data);

      if (
        resService.data.serviceCategory.serviceCategoryId == 3 ||
        resService.data.serviceCategory.serviceCategoryId == 4
      ) {
        const formInput = await { ...inputBooking };
        formInput["session"] = 1;
        await setInputBooking(formInput);
      }

      const resBooking = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/booking/${params.serviceId}`,
        method: `GET`,
      });
      setBooking(resBooking.data);

      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Preloder />;
  }

  if (success) {
    return <PaymentBookingSuccess text={"Booking"} link={"your-listing"} />;
  }

  return (
    <>
      <div className="container-sm">
        <div className="card">
          <h5 className="m-3 font-weight-bold">
            You are contacting{" "}
            <span className="text-info">{service.user.name}</span>
          </h5>
          <div className="card-header">
            <div className="steps">
              <div className={`step ${indexTab == 1 ? "active" : " "}`}>
                <span>1</span>
              </div>
              <div className={`step ${indexTab == 2 ? "active" : " "}`}>
                <span>2</span>
              </div>
              <div className={`step ${indexTab == 3 ? "active" : " "}`}>
                <span>3</span>
              </div>
            </div>
          </div>
          <div id="cardBody" className="card-body ">
            <div className="tabs ">
              <div
                id="first"
                className={`tab ${indexTab == 1 ? "card-active" : " "}`}
              >
                <ServiceDetailInfo
                  petType={petType}
                  service={service}
                  inputBooking={inputBooking}
                  handleChange={handleChange}
                  setInputBooking={setInputBooking}
                  params={params}
                  setIndexTab={setIndexTab}
                  indexTab={indexTab}
                  setAvailableBooking={setAvailableBooking}
                />
              </div>

              <div
                id="second"
                className={`tab ${indexTab == 2 ? "card-active" : ""}`}
              >
                <PetInfo
                  service={service}
                  inputBooking={inputBooking}
                  handleChange={handleChange}
                  setIndexTab={setIndexTab}
                  indexTab={indexTab}
                  availableBooking={availableBooking}
                  setInputBooking={setInputBooking}
                />
              </div>

              <div
                id="third"
                className={`tab ${indexTab == 3 ? "card-active" : ""}`}
              >
                <SummaryInfo
                  service={service}
                  inputBooking={inputBooking}
                  handleSubmit={handleSubmit}
                  setIndexTab={setIndexTab}
                  indexTab={indexTab}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
