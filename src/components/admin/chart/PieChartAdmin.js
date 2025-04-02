import { sendRequest } from "@/utils/api";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

export default function PieChartAdmin({ users }) {
  const [totalCustomer, setTotalCustomer] = useState();
  const [totalProvider, setTotalProvider] = useState();
  const [totalAdmin, setTotalAdmin] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const filterCustomer = users.filter((item) => {
          return item.role.roleName == "ROLE_CUSTOMER";
        });
        setTotalCustomer(filterCustomer.length);
        const filterProvider = users.filter((item) => {
          return item.role.roleName == "ROLE_PROVIDER";
        });
        setTotalProvider(filterProvider.length);
        const filterAdmin = users.filter((item) => {
          return item.role.roleName == "ROLE_ADMIN";
        });
        setTotalAdmin(filterAdmin.length);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  if (!users) {
    return <></>;
  }
  return (
    <div className="pie-char-admin col-md-5 ml-4">
      <PieChart
        series={[
          {
            arcLabel: (item) =>
              `${Math.ceil((item.value * 100) / users.length)}%`,
            arcLabelRadius: "60%",
            data: [
              { id: 0, value: totalCustomer, label: "Total Customers" },
              { id: 1, value: totalProvider, label: "Total Providers" },
              { id: 2, value: totalAdmin, label: "Total Admin" },
            ],
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
          },
        }}
        width={undefined}
        height={200}
      />
    </div>
  );
}
