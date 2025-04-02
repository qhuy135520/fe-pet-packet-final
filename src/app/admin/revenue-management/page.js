"use client";
import Revenue from "@/components/admin/Revenue";
import RevenueDetail from "@/components/admin/RevenueDetail";
import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";

export default function RevenueManagement() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState(null);
  const [tabRevenue, setTabRevenue] = useState(true);
  const [tabRevenueDetail, setTabRevenueDetail] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const resUser = await sendRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/revenue-management`,
        method: "GET",
      });
      setUsers(resUser.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  if (tabRevenue) {
    return (
      <Revenue
        users={users}
        setRevenue={setRevenue}
        setLoading={setLoading}
        setTabRevenueDetail={setTabRevenueDetail}
        setTabRevenue={setTabRevenue}
      />
    );
  }
  if (tabRevenueDetail) {
    return (
      <RevenueDetail
        revenue={revenue}
        setTabRevenueDetail={setTabRevenueDetail}
        setTabRevenue={setTabRevenue}
      />
    );
  }
}
