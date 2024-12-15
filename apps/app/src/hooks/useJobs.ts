import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { Job } from "../types/jobs.types";
import { Filter } from "../pages/jobs-page/Jobs-page";

export default function useJobs(filter: Filter) {
  const { title, location } = filter;
  const fetchJobs = () =>
    apiClient
      .get(`/jobs/browse`, {
        params: {
          title,
          location,
        },
      })
      .then((res) => res.data.data);
  return useQuery<Job[]>({
    queryKey:
      !filter.title || !filter.location
        ? ["jobs"]
        : ["jobs", { title, location }],
    queryFn: fetchJobs,

  });
}
