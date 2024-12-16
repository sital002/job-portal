import { useQuery } from "@tanstack/react-query";
import { Job } from "../types/jobs.types";
import apiClient from "../utils/apiClient";

export default function useRecruitersJob() {
  const fetchRecruitersJob = async () => {
    const response = await apiClient.get("/jobs");
    console.log(response.data.data);
    return response.data.data;
  };

  return useQuery<Job[]>({
    queryKey: ["recruitersJob"],
    queryFn: fetchRecruitersJob,
  });
}
