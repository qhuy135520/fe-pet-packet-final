"use client";

import Review from "@/components/admin/Review";
import ServiceManagement from "@/components/admin/Service";
import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [tabService, setTabService] = useState(true);
  const [tabServiceDetail, setTabServiceDetail] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [services, setServices] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const resServices = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/services-management`,
        });
        if (resServices) {
          setServices(resServices.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  if (tabService) {
    return (
      <ServiceManagement
        services={services}
        setReviews={setReviews}
        setTabServiceDetail={setTabServiceDetail}
        setTabService={setTabService}
      />
    );
  }

  if (tabServiceDetail) {
    return (
      <Review
        reviews={reviews}
        setTabServiceDetail={setTabServiceDetail}
        setTabService={setTabService}
      />
    );
  }
}
