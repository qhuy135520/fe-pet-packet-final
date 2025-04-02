"use client";

import Review from "@/components/admin/Review";
import Upgrades from "@/components/admin/Upgrades";
import { sendRequest } from "@/utils/api";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [upgrades, setUpgrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const resUpgrades = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/upgrades`,
        });
        setUpgrades(resUpgrades.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return <Upgrades upgrades={upgrades} />;
}
