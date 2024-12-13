import { Link } from "react-router-dom";
import useBooking from "../../hooks/useBooking";
import { motion } from "framer-motion";
import { Job } from "../../types/jobs.types";

export type Data = {
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  user: string; // User ID
  __v: number;
  _id: string; // Data ID
  job: Job;
};
export const BookMarkPage = () => {
  const { data: bookmarks, isLoading, error } = useBooking();

  console.log(bookmarks);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      {bookmarks ? (
        bookmarks.length > 0 &&
        bookmarks?.map((job: Data, index: number) => (
          <motion.div
            key={job._id.toString()}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-lg font-semibold">{job.job.title}</h3>
            <p className="text-gray-600">{job.job.company}</p>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">{job.job.location}</span>
              <span className="text-sm text-gray-500">{job.job.type}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Posted {job.job.createdAt.slice(0, 10)}
            </p>
            <Link
              to={`/jobs/${job.job._id}`}
              className="text-blue-600 hover:underline"
            >
              View
            </Link>
          </motion.div>
        ))
      ) : (
        <div>
          <h1>No data found</h1>
        </div>
      )}
    </div>
  );
};
