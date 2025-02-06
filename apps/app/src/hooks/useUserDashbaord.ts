import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

export const useGetTotalAppliedJobs = () => {
  const fetchTotalAppliedJobs = async () => {
    const response = await apiClient.get("/jobs/total-applied-jobs");
    return response.data.data;
  };
  return useQuery({
    queryFn: fetchTotalAppliedJobs,
    queryKey: ["totalAppliedJobs"],
  });
};

export const useGetTotalAcceptedJobs = () => {
  const fetchTotalAcceptedJobs = async () => {
    const response = await apiClient.get("/jobs/total-accepted-jobs");
    return response.data.data;
  };
  return useQuery({
    queryFn: fetchTotalAcceptedJobs,
    queryKey: ["totalAcceptedJobs"],
  });
};

export const useGetTotalRejectedJobs = () => {
  const fetchTotalRejectedJobs = async () => {
    const response = await apiClient.get("/jobs/total-Rejected-jobs");
    return response.data.data;
  };
  return useQuery({
    queryFn: fetchTotalRejectedJobs,
    queryKey: ["totalRejectedJobs"],
  });
};

export const useGetTotalPendingJobs = () => {
  const fetchTotalPendingJobs = async () => {
    const response = await apiClient.get("/jobs/total-pending-jobs");
    return response.data.data;
  };
  return useQuery({
    queryFn: fetchTotalPendingJobs,
    queryKey: ["totalPendingJobs"],
  });
};

export const useGetRecentAppliedJobs = () => {
  const fetchRecentAppliedJobs = async () => {
    const response = await apiClient.get("/jobs/recent-applied-jobs");
    return response.data.data;
  };
  return useQuery({
    queryFn: fetchRecentAppliedJobs,
    queryKey: ["appliedJobs"],
  });
};
