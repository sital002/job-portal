import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { Job } from "../types/jobs.types";
import { Filter } from "../pages/jobs-page/Jobs-page";

export default function useJobs(filter: Filter) {
  const { title, location, type, minSalary, maxSalary, datePosted } = filter;

  // Helper function to check if the filter is empty
  const isFilterEmpty = () => {
    return (
      (!title || title === "") &&
      (!location || location === "") &&
      (!type || type.length === 0) &&
      (!minSalary || typeof minSalary === "string" || minSalary === 0) &&
      (!maxSalary || typeof maxSalary === "string" || maxSalary === 100000) &&
      (datePosted === "Anytime" || !datePosted)
    );
  };

  const fetchJobs = () => {
    const params = isFilterEmpty() ? {} : filter;

    return apiClient
      .get(`/jobs/browse`, { params })
      .then((res) => res.data.data);
  };

  return useQuery<Job[]>({
    queryKey: isFilterEmpty()
      ? ["jobs"]
      : ["jobs", { title, location, type, minSalary, maxSalary, datePosted }],
    queryFn: fetchJobs,
    placeholderData: keepPreviousData,
  });
}
