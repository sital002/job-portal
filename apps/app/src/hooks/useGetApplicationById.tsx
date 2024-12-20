import { useQuery } from "@tanstack/react-query";
import { JobApplication } from "../types/applied-job.types";
import apiClient from "../utils/apiClient";

export const useGetApplicationById = (applicationId: string) => {
    const fetchApplication = async () => {
        const response = await apiClient.get(
        `/jobs/application/${applicationId}`
        );
        return response.data.data;
    };
    return useQuery<JobApplication>({
        queryKey: ["applications", applicationId],
        queryFn: fetchApplication,
    });
}