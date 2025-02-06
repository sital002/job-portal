import { LineChart } from "@mui/x-charts/LineChart";

const uData = [3, 1, 2, 0];
// const pData = [2400, 1398, 9800, 3908];
const xLabels = [
  "Totla applied jobs",
  "total accepted jobs",
  "total rejected jobs",
  "total pending jobs",
];

export default function SimpleLineChart() {
  return (
    <LineChart
      width={800}
      height={500}
      series={[
        // { data: pData, label: "pv" },
        { data: uData, label: "uv" },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      yAxis={[
        {
          min: 0, // Set minimum value for Y-axis
          max: 5, // Set maximum value for Y-axis // Set interval for Y-axis
        },
      ]}
    />
  );
}
