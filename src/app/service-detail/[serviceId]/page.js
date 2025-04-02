"use client";
import ServiceSection from "@/components/service-detail/ServiceSection";
import { sendRequest } from "@/utils/api";
import ListingDetail from "@/components/service-detail/ListingDetail";
import { useEffect, useState } from "react";
import Preloder from "@/components/Preloder";

export default function ServiceDetail({ params }) {
  const [service, setService] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const resService = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/${params.serviceId}`,
        });

        setService(resService.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [params]);

  if (service === null) {
    return <Preloder/>;
  } 
    return (
      <>
        <>
          <ServiceSection service={service} />
          <ListingDetail service={service} setService={setService} />
        </>
      </>
    );
  
}
