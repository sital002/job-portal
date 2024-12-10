import React from "react";
import { Link, useParams } from "react-router-dom";
import useSingleJob from "../../hooks/useSingleJob";
import apiClient from "../../utils/apiClient";
import useBooking from "../../hooks/useBooking";

const SingleJob: React.FC = () => {
  const { jobId } = useParams();
  const { data: job, error, isLoading } = useSingleJob(jobId as string);
  const { data: bookmarks, isLoading: isBookmarksLoading } = useBooking();
  console.log("Bookmarks", bookmarks);
  const isBookMarked = bookmarks?.some((el: any) => el.job._id === jobId);
  console.log(job);

  async function addToBookMark(jobId: string) {
    console.log(jobId);
    try {
      const response = await apiClient.post("/bookmarks/new", { jobId });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading || isBookmarksLoading) return <p>Loading...</p>;

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
          <div className="flex gap-3 items-center justify-between ">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {job?.title}
            </h1>
            <button
              disabled={isBookMarked}
              onClick={() => addToBookMark(job?._id as string)}
              className={`${isBookMarked ? "bg-blue-400" : "bg-green-400"} text-white px-6 py-2 rounded-md `}
            >
              {isBookMarked ? "Booked" : "Book"}
            </button>
          </div>
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
            <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingleJob;
