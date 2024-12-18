import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { JobFormValues } from "../components/job-form/job-form";
import { useNavigate } from "react-router";

export default function useCreateJobMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (jobvalue: JobFormValues) => {
      const res = await apiClient.post("/jobs/new", jobvalue);
      return res.data;
    },
    onSuccess: () => {
      console.log("job updated successfully");
      queryClient.invalidateQueries({ queryKey: ["recruitersJob"] });
      navigate("/recruiter/jobs");
    },
  });
}
