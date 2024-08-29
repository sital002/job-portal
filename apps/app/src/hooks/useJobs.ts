import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { Job } from "../types/jobs.types";

export default function useJobs() {
  const fetchJobs = () =>
    apiClient.get(`/jobs/browse`).then((res) => res.data.data);
  return useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
}
