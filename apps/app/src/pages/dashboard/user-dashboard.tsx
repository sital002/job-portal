import SimpleBarChart from "../../components/charts/barchart";
import SimpleLineChart from "../../components/charts/linechart";
import BasicPie from "../../components/charts/piechart";
import JobApplicationsTable from "../../components/dashboard/recent-applied-jobs-table";
import {
  useGetRecentAppliedJobs,
  useGetTotalAcceptedJobs,
  useGetTotalAppliedJobs,
  useGetTotalJobs,
  useGetTotalPendingJobs,
  useGetTotalRejectedJobs,
} from "../../hooks/useUserDashbaord";

function UserDashBoard() {
  const { data: totalAppliedJobs } = useGetTotalAppliedJobs();
  const { data: totalAcceptedJobs } = useGetTotalAcceptedJobs();
  const { data: totalRejectedJobs } = useGetTotalRejectedJobs();
  const { data: totalPendingJobs } = useGetTotalPendingJobs();
  const { data: recentAppliedJobs } = useGetRecentAppliedJobs();
  const { data: totalJobs } = useGetTotalJobs();

  console.log("Total applied jobs", totalAppliedJobs);
  console.log("Total accepted jobs", totalAcceptedJobs);
  console.log("Total rejected jobs", totalRejectedJobs);
  console.log("Total pending jobs", totalPendingJobs);
  console.log("Recent applied jobs", recentAppliedJobs);
  console.log("Total jobs", totalJobs);

  return (
    <div className="container mx-auto p-4">
      <h1>User Dashboard</h1>
      <p>Here you can see your profile and other user-specific information</p>
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gray-200 px-4 py-8">
          Total Jobs {totalJobs?.totalJobs}
        </div>
        <div className="bg-gray-200 px-4 py-8">
          Total Applied Jobs {totalAppliedJobs?.totalJobs}
        </div>
        <div className="bg-gray-200 px-4 py-8">
          totalAcceptedJobs {totalAcceptedJobs?.totalAcceptedJobs}
        </div>
        <div className="bg-gray-200 px-4 py-8">
          {" "}
          totalPendingJobs {totalPendingJobs?.totalPendingJobs}
        </div>
        <div className="bg-gray-200 px-4 py-8">
          totalRejectedJobs {totalRejectedJobs?.totalRejectedJobs}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <div className="bg-gray-200 px-4 py-8">
          line Chartjs
          <SimpleLineChart
            totalAcceptedJobs={totalAcceptedJobs?.totalAcceptedJobs ?? 0}
            totalAppliedJobs={totalAppliedJobs?.totalJobs ?? 0}
            totalPendingJobs={totalPendingJobs?.totalPendingJobs ?? 0}
            totalRejectedJobs={totalRejectedJobs?.totalRejectedJobs ?? 0}
            totaljobs={totalJobs?.totalJobs ?? 0}
          />
        </div>
        <div className="bg-gray-200 px-4 py-8">
          Pie Chart
          <SimpleBarChart />
          <BasicPie />
        </div>
      </div>
      <div>
        <h1>Recent jobs</h1>
        <JobApplicationsTable applications={recentAppliedJobs || []} />
      </div>
    </div>
  );
}

export default UserDashBoard;
