import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { JobApplication } from "../types/applied-job.types";

export const useGetSingleAppliedJob = (jobId?: string) => {
  const fetchAppliedJobs = async () => {
    const response = await apiClient.get(
      `/jobs/applied-jobs/${jobId}`
    );
    return response.data.data;
  };
  return useQuery<JobApplication>({
    queryKey: ["appliedJobs", jobId],
    queryFn: fetchAppliedJobs,
  });
};
