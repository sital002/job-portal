import JobList from "../../components/job-list/job-list";
import useRecruitersJob from "../../hooks/useRecruitersJob";
import { Job } from "../../types/jobs.types";

function RecruitersJob() {
  const { data: recruitersJob, isLoading, isError, error } = useRecruitersJob();
  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      RecruitersJob
      <JobList
        jobs={recruitersJob as Job[]}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
}

export default RecruitersJob;
