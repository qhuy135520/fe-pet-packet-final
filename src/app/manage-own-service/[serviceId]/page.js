"use client";
import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import "nice-forms.css/dist/nice-forms.css";
import "@/styles/manage-own-service/manage-service-detail.css";
import Preloder from "@/components/Preloder";
import GeneralInfo from "@/components/manage-own-service/manage-service-detail/GeneralInfo";
import DetailInfo from "@/components/manage-own-service/manage-service-detail/DetailInfo";
import AddonInfo from "@/components/manage-own-service/manage-service-detail/AddonInfo";

export default function ManageServiceDetail({ params }) {
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);
  const [cities, setCities] = useState(null);
  const [petType, setPetType] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const resService = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/${params.serviceId}`,
        method: "GET",
      });
      setService(resService.data);

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
      setLoading(false);
    }
    fetchData();
  }, [params]);

  if (loading) {
    return <Preloder />;
  }

  return (
    <>
      <div className="container">
        <div className="manage-service-detail">
          <form>
            <GeneralInfo
              service={service}
              cities={cities}
              petType={petType}
              setService={setService}
            />

            <DetailInfo petType={petType} service={service} setService={setService} />
            <AddonInfo service={service} setService={setService} />
          </form>
        </div>
      </div>
    </>
  );
}
