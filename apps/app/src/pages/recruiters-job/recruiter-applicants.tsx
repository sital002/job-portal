import { useParams } from "react-router";
import { useGetApplications } from "../../hooks/useGetApplications";
import { Link } from "react-router-dom";

function RecruitersApplicant() {
  const { jobId } = useParams();

  const { data: appliedJobs, isLoading: isAppliedJobLoading } =
    useGetApplications(jobId as string);

  if (isAppliedJobLoading) return <p>Loading...</p>;

  console.log(appliedJobs);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Applied Jobs</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied On
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appliedJobs?.map((job, index: number) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {job.job.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      job.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : job.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-xs"
                    to={`/recruiter/applicant/${job._id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecruitersApplicant;
