import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { JobApplication } from "../types/applied-job.types";

export const useGetAppliedJob = () => {
  const fetchAppliedJobs = async () => {
    const response = await apiClient.get("/jobs/applied-jobs");
    return response.data.data;
  };
  return useQuery<JobApplication[]>({
    queryKey: ["appliedJobs"],
    queryFn: fetchAppliedJobs,
  });
};
