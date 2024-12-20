import React from "react";
import { useGetApplicationById } from "../../hooks/useGetApplicationById";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function RecruitersApplicantSingle() {
  const { id } = useParams();
  const { data, isLoading } = useGetApplicationById(id as string);
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Applicant</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Link
          className="text-blue-600"
          to={`/recruiter/applicants/${data?.job._id}`}
        >
          Go Back
        </Link>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">
            {data?.job.title}
          </h2>
          <p className="text-gray-600 mb-4">{data?.job.description}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">
              Salary Range:
              <span className="font-medium text-gray-700">
                ${data?.job.salaryRange.min.toLocaleString()} - $
                {data?.job.salaryRange.max.toLocaleString()}
              </span>
            </div>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded ${
                data?.status === "Pending"
                  ? "bg-ydatalow-200 text-ydatalow-800"
                  : data?.status === "Accepted"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
              }`}
            >
              {data?.status}
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Applied on:</span>{" "}
            {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Applicant:</span> {data?.applicant}
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Cover Letter
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {data?.coverLetter}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecruitersApplicantSingle;
