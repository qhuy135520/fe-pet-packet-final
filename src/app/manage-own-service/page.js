"use client";
import AddService from "@/components/manage-own-service/add-service/AddService";
import ManageService from "@/components/manage-own-service/ManageService";
import ServiceReport from "@/components/manage-own-service/ServiceReport";
import ChooseCategory from "@/components/manage-own-service/ChooseCategory";
import "@/styles/manage-own-service/manage-own-service.css";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Preloder from "@/components/Preloder";
import Vouchers from "@/components/manage-own-service/vouchers/page";
export default function ManageOwnService() {
  const [indexTab, setIndexTab] = useState(2);
  const [serviceCategory, setServiceCategory] = useState(null);
  const [petType, setPetType] = useState(null);
  const [cities, setCities] = useState([]);
  const [services, setServices] = useState();
  const [serviceId, setServiceId] = useState();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const resServiceCategory = await sendRequest({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/service-categories`,
        body: "",
      });
      setServiceCategory(resServiceCategory.data);

      const resCities = await sendRequest({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/cities`,
      });
      setCities(resCities.data);

      const resPetType = await sendRequest({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/types`,
      });
      setPetType(resPetType.data);

      if (session) {
        const resServices = await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/manage-service/${session.user.userId}`,
          method: "GET",
        });
        setServices(resServices.data);

        const resBooking = await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/booking/get-booking-own-service/${session.user.userId}`,
          method: "GET",
        });
        setBooking(resBooking.data);
        setLoading(false);
      }
    }
    fetchData();
  }, [session]);

  if (loading) {
    return <Preloder />;
  }

  return (
    <>
      <div className="manage-own-service">
        <div id="nav">
          <ul>
            <li>
              <div>
                <a href="#" onClick={() => setIndexTab(1)}>
                  Add service
                </a>
              </div>
            </li>
            <li>
              <div>
                <a href="#" onClick={() => setIndexTab(2)}>
                  Manage service
                </a>
              </div>
            </li>
            <li>
              <div>
                <a href="#" onClick={() => setIndexTab(3)}>
                  Service report
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="manage-own-service-content">
        {indexTab === 1 && <ChooseCategory serviceCategory={serviceCategory} />}
        {indexTab === 2 && (
          <ManageService
            serviceCategory={serviceCategory}
            services={services}
            setServices={setServices}
            cities={cities}
            petType={petType}
            setServiceId={setServiceId}
            setIndexTab={setIndexTab}
          />
        )}
        {indexTab === 3 && <ServiceReport booking={booking} />}
        {indexTab === 4 && (
          <Vouchers serviceId={serviceId} setIndexTab={setIndexTab} />
        )}
      </div>
    </>
  );
}
