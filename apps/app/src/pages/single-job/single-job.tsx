import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import useSingleJob from "../../hooks/useSingleJob";
import apiClient from "../../utils/apiClient";

const SingleJob: React.FC = () => {
  const { jobId } = useParams();
  const { data: job, error, isLoading } = useSingleJob(jobId as string);
  console.log(job);
  const [resume, setResume] = useState<File>();

  const handleApply = async () => {
    const formData = new FormData();
    formData.append("resume", resume as Blob);
    formData.append("coverLetter", "I am a great fit for this job");
    try {
      const response = await apiClient.post(`/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link to="/jobs" className="text-blue-600 hover:underline">
            &larr; Back to job listings
          </Link>
        </div>
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {job?.title}
          </h1>
          <div className="text-gray-600 mb-4">
            <p>{job?.company}</p>
            <p>
              Posted on{" "}
              {job?.createdAt && new Date(job.createdAt).toDateString()}
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Job Description</h2>

            <p className="text-gray-700 mb-4 text-justify">
              {job?.description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              Salary Range: {job?.salaryRange.min} - {job?.salaryRange.max}
            </span>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
              onClick={handleApply}
            >
              Apply Now
            </button>
          </div>
          <input
            type="file"
            accept="pdf"
            onChange={(e) => setResume(e.target.files?.[0])}
          />
        </div>
      </main>
    </div>
  );
};

export default SingleJob;
