import JobList from "../../components/job-list/job-list";
import ShimmerHome from "../../components/shimmer";
import useRecruitersJob from "../../hooks/useRecruitersJob";
import { Job } from "../../types/jobs.types";

function RecruitersJob() {
  const { data: recruitersJob, isLoading, isError, error } = useRecruitersJob();
  if (isLoading) return <ShimmerHome />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full bg-red-100 ">
      {/* RecruitersJob */}
      <JobList
        jobs={recruitersJob as Job[]}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
}

export default RecruitersJob;
