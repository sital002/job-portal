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

  return (
    <div className="container mx-auto p-4">
      <h1>User Dashboard</h1>
      <p>Here you can see your profile and other user-specific information</p>
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-blue-200 px-4 py-8 rounded-lg">
          <h1 className="text-lg font-sans">
            Total Jobs
            <span>{totalJobs?.totalJobs}</span>
          </h1>
        </div>
        <div className="bg-orange-200 px-4 py-8 rounded-lg">
          Total Applied Jobs {totalAppliedJobs?.totalJobs}
        </div>
        <div className="bg-green-200 px-4 py-8 rounded-lg">
          totalAcceptedJobs {totalAcceptedJobs?.totalAcceptedJobs}
        </div>
        <div className="bg-yellow-200 px-4 py-8 rounded-lg">
          {" "}
          totalPendingJobs {totalPendingJobs?.totalPendingJobs}
        </div>
        <div className="bg-red-200 px-4 py-8 rounded-lg">
          totalRejectedJobs {totalRejectedJobs?.totalRejectedJobs}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <div className="bg-gray-50 px-4 py-8">
          line Chartjs
          <SimpleLineChart
            totalAcceptedJobs={totalAcceptedJobs?.totalAcceptedJobs ?? 0}
            totalAppliedJobs={totalAppliedJobs?.totalJobs ?? 0}
            totalPendingJobs={totalPendingJobs?.totalPendingJobs ?? 0}
            totalRejectedJobs={totalRejectedJobs?.totalRejectedJobs ?? 0}
            totaljobs={totalJobs?.totalJobs ?? 0}
          />
        </div>
        <div className="bg-slate-50 px-4 py-8">
          Pie Chart
          <SimpleBarChart
            totalAcceptedJobs={totalAcceptedJobs?.totalAcceptedJobs ?? 0}
            totalAppliedJobs={totalAppliedJobs?.totalJobs ?? 0}
            totalPendingJobs={totalPendingJobs?.totalPendingJobs ?? 0}
            totalRejectedJobs={totalRejectedJobs?.totalRejectedJobs ?? 0}
            totaljobs={totalJobs?.totalJobs ?? 0}
          />
          <BasicPie
            totalAcceptedJobs={totalAcceptedJobs?.totalAcceptedJobs ?? 0}
            totalAppliedJobs={totalAppliedJobs?.totalJobs ?? 0}
            totalPendingJobs={totalPendingJobs?.totalPendingJobs ?? 0}
            totalRejectedJobs={totalRejectedJobs?.totalRejectedJobs ?? 0}
          />
        </div>
      </div>
      <div className="m-2">
        <h1 className="text-lg font-medium py-2">Recent jobs</h1>
        <JobApplicationsTable applications={recentAppliedJobs || []} />
      </div>
    </div>
  );
}

export default UserDashBoard;
