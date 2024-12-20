import { useParams } from "react-router";
import { useGetSingleAppliedJob } from "../../hooks/useGetSingleAppliedJob";
import { Link } from "react-router-dom";

function SingleAppliedJobs() {
  const { jobId } = useParams();

  const { data, isLoading } = useGetSingleAppliedJob(jobId as string);
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500">
          Loading
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">No applied jobs found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Applied Jobs</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Link className="text-blue-600" to={`/jobs/appliedJobs`}>G0 Back</Link>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">
            {data.job.title}
          </h2>
          <p className="text-gray-600 mb-4">{data.job.description}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">
              Salary Range:
              <span className="font-medium text-gray-700">
                ${data.job.salaryRange.min.toLocaleString()} - $
                {data.job.salaryRange.max.toLocaleString()}
              </span>
            </div>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded ${
                data.status === "Pending"
                  ? "bg-ydatalow-200 text-ydatalow-800"
                  : data.status === "Accepted"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
              }`}
            >
              {data.status}
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Applied on:</span>{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Applicant:</span> {data.applicant}
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Cover Letter
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {data.coverLetter}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleAppliedJobs;
