"use client";
import { sendRequest } from "@/utils/api";
import { MenuItem, TextField } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

export default function BarChartAdmin({ pData, uData }) {
  const xLabels = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  return (
    <div className="bar-chart-admin col-md-5">
      <BarChart
        width={undefined}
        series={[
          { data: pData, label: "Refund", id: "pvId", stack: "total" },
          { data: uData, label: "Commission", id: "uvId", stack: "total" },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
        yAxis={[
          {
            valueFormatter: (value) => `${(value / 1000000).toLocaleString()}M`,
          },
        ]}
      />
    </div>
  );
}
