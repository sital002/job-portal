import { useMutation } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { JobFormValues } from "../components/job-form/job-form";

export default function useCreateJobMutation() {
  return useMutation({
    mutationFn: async(jobvalue:JobFormValues) => {
      const res = await apiClient.post("/jobs/new", jobvalue);
      return res.data;
    },
  });
}
