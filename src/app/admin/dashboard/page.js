"use client";
import BarChartAdmin from "@/components/admin/chart/BarchartAdmin";
import PieChartAdmin from "@/components/admin/chart/PieChartAdmin";
import TotalWidget from "@/components/admin/chart/TotalWidget";
import "@/styles/admin/admin-chart.css";
import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";

export default function DashBoard() {
  const [users, setUsers] = useState();
  const [booking, setBooking] = useState();
  const [service, setService] = useState();
  const [loading, setLoading] = useState(true);
  const [uData, setUData] = useState([]);
  const [pData, setPData] = useState([]);
  const [commission, setCommission] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const resUser = await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
          method: "GET",
        });
        if (resUser) {
          setUsers(resUser.data);
        }
        const date = new Date();
        const resRevenue = await sendRequest({
          url: `${
            process.env.NEXT_PUBLIC_API_URL
          }/api/admin/revenue-management/all-revenue/${date.getFullYear()}`,
          method: "GET",
        });
        if (resRevenue) {
          let sumRevenueBookingMonth = 0;

          for (let i = 0; i < resRevenue.data.revenueBookingMonth.length; i++) {
            sumRevenueBookingMonth += resRevenue.data.revenueBookingMonth[i];
          }

          setCommission(sumRevenueBookingMonth);
          setPData(resRevenue.data.revenueMonth);
          setUData(resRevenue.data.revenueBookingMonth);
        }
        const resBooking = await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/booking-management`,
          method: "GET",
        });
        if (resBooking) {
          setBooking(resBooking.data);
        }
        const resService = await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/`,
          method: "GET",
        });
        if (resService) {
          setService(resService.data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <>
      <TotalWidget users={users} commission={commission} booking={booking} service={service}/>
      <div
        className="row d-flex justify-content-center admin-dashboard-management align-items-center"
        style={{ backgroundColor: "#ebedef" }}
      >
        <BarChartAdmin uData={uData} pData={pData} />
        <PieChartAdmin users={users} />
      </div>
    </>
  );
}
