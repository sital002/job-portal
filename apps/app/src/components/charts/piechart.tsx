import { PieChart } from "@mui/x-charts/PieChart";
type BasicPieProps = {
  totalAppliedJobs: number;
  totalAcceptedJobs: number;
  totalRejectedJobs: number;
  totalPendingJobs: number;
};
export default function BasicPie({
  totalAppliedJobs,
  totalAcceptedJobs,
  totalRejectedJobs,
  totalPendingJobs,
}: BasicPieProps) {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: totalAppliedJobs, label: "Total Applied Jobs" },
            { id: 1, value: totalAcceptedJobs, label: "Total Accepted Jobs" },
            { id: 2, value: totalPendingJobs, label: "Total Pending Jobs" },
            { id: 3, value: totalRejectedJobs, label: "Total Rejected Jobs" },
          ],
        },
      ]}
      width={500}
      height={200}
    />
  );
}
