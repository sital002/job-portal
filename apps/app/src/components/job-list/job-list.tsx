import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { Job } from "../../types/jobs.types";
import { useAuth } from "../../context/useAuth";
type JobListProps = {
  jobs: Job[] | undefined;
  error: { message: string } | null;
  isLoading: boolean;
};

const JobList: React.FC<JobListProps> = ({ jobs, error, isLoading }) => {
  const { user, loading } = useAuth();
  return (
    <div className="flex-grow">
      <h2 className="text-xl font-semibold mb-4">
        {jobs?.length} Jobs results
      </h2>
      <div className="space-y-4">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {jobs &&
          jobs.length > 0 &&
          jobs?.map((job, index: number) => (
            <motion.div
              key={job._id.toString()}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-500">{job.location}</span>
                <span className="text-sm text-gray-500">{job.type}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Posted {job.createdAt.slice(0, 10)}
              </p>
              <Link
                to={`${loading &&user?.role==="USER" ? "/jobs" : "/recruiter/jobs"}/${job._id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default JobList;
