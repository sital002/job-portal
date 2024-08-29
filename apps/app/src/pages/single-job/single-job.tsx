import React from "react";
import { useParams } from "react-router-dom";

import useSingleJob from "../../hooks/useSingleJob";

const SingleJob: React.FC = () => {
  const { jobId } = useParams();
  const { data: job, error, isLoading } = useSingleJob(jobId as string);
  console.log(job);

  return (
    <div>
      <h1>single-job</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      {job && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-500">{job.location}</span>
            <span className="text-sm text-gray-500">{job.type}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Posted {job.createdAt.slice(0, 10)}
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleJob;
