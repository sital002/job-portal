import { Job } from "../types/jobs.types";
import apiClient from "../utils/apiClient";
import { useQuery } from "@tanstack/react-query";
export default function useSingleJob(jobId: string | null, role?: string) {
  const fetchJob = () => {
    if (role === "RECRUITER") {
      return apiClient.get(`/jobs/${jobId}`).then((res) => res.data.data);
    }
    return apiClient.get(`/jobs/browse/${jobId}`).then((res) => res.data.data);
  };
  return useQuery<Job>({
    queryKey: role ? ["recruitersJob", jobId] : ["job", jobId],
    queryFn: fetchJob,
  });
}
