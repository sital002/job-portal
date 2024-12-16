import { useMutation } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { JobFormValues } from "../components/job-form/job-form";

export default function useEditJobMutation(jobId: string) {
  return useMutation({
    mutationFn: async (jobvalue: JobFormValues) => {
      const res = await apiClient.put(`/jobs/${jobId}`, jobvalue);
      return res.data;
    },
  });
}
