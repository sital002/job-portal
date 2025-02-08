import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

type SimpleBarChartProps = {
  totaljobs: number;
  totalAcceptedJobs: number;
  totalRejectedJobs: number;
  totalPendingJobs: number;
  totalAppliedJobs: number;
};

// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ["Accepted Jobs", "Rejected Jobs", "Pending Jobs", "Applied Jobs"];


export default function SimpleBarChart({
  totaljobs,
  totalAcceptedJobs,
  totalRejectedJobs,
  totalPendingJobs,
  totalAppliedJobs,
}: SimpleBarChartProps) {
  const Data = [
    totalAcceptedJobs,
    totalRejectedJobs,
    totalPendingJobs,
    totalAppliedJobs,
  ];
  return (
    <BarChart
      width={550}
      height={350}
      series={[
        {
          data: Data,
          label: "jobs",
          color: "#3f51b5",
        },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
      yAxis={[
        {
          min: 0, // Set minimum value for Y-axis
          max: totaljobs, // Set maximum value for Y-axis // Set interval for Y-axis
        },
      ]}
    />
  );
}
