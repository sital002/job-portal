import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { JobApplication } from "../types/applied-job.types";

export const useGetApplications = (jobId: string) => {
  const fetchApplications = async () => {
    const response = await apiClient.get(`/jobs/applications/${jobId}`);
    
    return response.data.data;
  };
  return useQuery<JobApplication[]>({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
};
