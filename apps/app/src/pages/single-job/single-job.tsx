import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import useSingleJob from "../../hooks/useSingleJob";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { Navigate } from "react-router-dom";
import { Job } from "../../types/jobs.types";

type BookMarkType = {
  _id?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  company?: string | undefined;
  location?: string | undefined;
  salaryRange?:
    | {
        min: number;
        max: number;
      }
    | undefined;
  type?: string | undefined;
  createdAt?: string | undefined;
};
const SingleJob: React.FC = () => {
  const { jobId } = useParams();
  const { data: job, error, isLoading } = useSingleJob(jobId as string);
  console.log(job);
  const queryClient = useQueryClient();

  const { isLoggedIn } = useAuth();

  const addBookmarkMutation = useMutation({
    mutationFn: (newBookmarkJob) =>
      apiClient
        .post("/bookmarks/new", newBookmarkJob)
        .then((res) => res.data.data),
    onSuccess: (savedBookmarkJob, newBookmarkJob) => {
      queryClient.setQueryData<BookMarkType[] | undefined>(
        ["booking"],
        (newBookmark) => [savedBookmarkJob, ...newBookmark]
      );
    },
  });

  const addBookmark = (): JSX.Element | void => {
    if (isLoggedIn) {
      // Assuming isLoggedIn is a boolean variable
      return <Navigate to="/login" />;
    }
    const newBookmarkJob = { ...job };
    addBookmarkMutation.mutate(newBookmarkJob);
    console.log(newBookmarkJob);
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
          <div className="flex gap-3 items-center justify-between ">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {job?.title}
            </h1>
            <button onClick={() => addBookmark}>book</button>
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
