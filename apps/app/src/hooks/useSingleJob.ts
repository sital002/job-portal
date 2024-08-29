import { Job } from "../types/jobs.types";
import apiClient from "../utils/apiClient";
import { useQuery } from "@tanstack/react-query";
export default function useSingleJob(jobId: string | null) {
  const fetchJob = () =>
    apiClient.get(`/jobs/browse/${jobId}`).then((res) => res.data.data);
  return useQuery<Job>({
    queryKey: ["job", jobId],
    queryFn: fetchJob,
  });
}
