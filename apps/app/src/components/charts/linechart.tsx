import { LineChart } from "@mui/x-charts/LineChart";

// const pData = [2400, 1398, 9800, 3908];
const xLabels = [
  "Accepted Jobs",
  "Rejected Jobs",
  "Pending Jobs",
  "Applied Jobs",
];

type SimpleLineChartProps = {
  totaljobs: number;
  totalAcceptedJobs: number;
  totalRejectedJobs: number;
  totalPendingJobs: number;
  totalAppliedJobs: number;
};

export default function SimpleLineChart({
  totaljobs,
  totalAcceptedJobs,
  totalRejectedJobs,
  totalPendingJobs,
  totalAppliedJobs,
}: SimpleLineChartProps) {
  const Data = [
    totalAppliedJobs,
    totalAcceptedJobs,
    totalRejectedJobs,
    totalPendingJobs,
  ];
  return (
    <LineChart
      width={700}
      height={500}
      series={[{ data: Data, label: "jobs" }]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      yAxis={[
        {
          min: 0, // Set minimum value for Y-axis
          max: totaljobs, // Set maximum value for Y-axis // Set interval for Y-axis
        },
      ]}
    />
  );
}
