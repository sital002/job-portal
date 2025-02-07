import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { JobApplication } from "../types/applied-job.types";
import apiClient from "../utils/apiClient";

export const useGetApplicationById = (applicationId: string) => {
  const fetchApplication = async () => {
    const response = await apiClient.get(`/jobs/application/${applicationId}`);
    return response.data.data;
  };
  return useQuery<JobApplication>({
    queryKey: ["applications", applicationId],
    queryFn: fetchApplication,
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { status: string; applicationId: string }) => {
      if (data.status === "") throw new Error("Status is required");
      const response = await apiClient.put(
        `/jobs/application/${data.applicationId}`,
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });
};
