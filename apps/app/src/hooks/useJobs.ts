import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { Job } from "../types/jobs.types";
import { Filter } from "../pages/jobs-page/Jobs-page";

type Pagination = {
  totalPages: number;
  limit: number;
};
export default function useJobs(
  filter: Filter,
  { totalPages, limit = 5 }: Pagination
) {
  const { title, location } = filter;
  const fetchJobs = () => {
    if (!title || !location) {
      return apiClient.get(`/jobs/browse`).then((res) => res.data.data);
    }
    return apiClient
      .get(`/jobs/browse`, {
        params: {
          title,
          location,
          limit,
          page: (totalPages - 1) * limit,
        },
      })
      .then((res) => res.data.data);
  };
  return useQuery<Job[]>({
    queryKey: !title || !location ? ["jobs"] : ["jobs", { title, location }],
    queryFn: fetchJobs,
    placeholderData: keepPreviousData,
  });
}
