import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { JobApplication } from "../types/applied-job.types";

type TotalAppliedJobs = {
  totalJobs: number;
};

type TotalAcceptedJobs = {
  totalAcceptedJobs: number;
};
type TotalRejectedJobs = {
  totalRejectedJobs: number;
};

type TotalPendingJobs = {
  totalPendingJobs: number;
};
type TotalJobs = {
  totalJobs: number;
};

export const useGetTotalAppliedJobs = () => {
  const fetchTotalAppliedJobs = async () => {
    const response = await apiClient.get("/jobs/total-applied-jobs");
    return response.data.data;
  };
  return useQuery<TotalAppliedJobs>({
    queryFn: fetchTotalAppliedJobs,
    queryKey: ["totalAppliedJobs"],
  });
};

export const useGetTotalAcceptedJobs = () => {
  const fetchTotalAcceptedJobs = async () => {
    const response = await apiClient.get("/jobs/total-accepted-jobs");
    return response.data.data;
  };
  return useQuery<TotalAcceptedJobs>({
    queryFn: fetchTotalAcceptedJobs,
    queryKey: ["totalAcceptedJobs"],
  });
};

export const useGetTotalRejectedJobs = () => {
  const fetchTotalRejectedJobs = async () => {
    const response = await apiClient.get("/jobs/total-Rejected-jobs");
    return response.data.data;
  };
  return useQuery<TotalRejectedJobs>({
    queryFn: fetchTotalRejectedJobs,
    queryKey: ["totalRejectedJobs"],
  });
};

export const useGetTotalPendingJobs = () => {
  const fetchTotalPendingJobs = async () => {
    const response = await apiClient.get("/jobs/total-pending-jobs");
    return response.data.data;
  };
  return useQuery<TotalPendingJobs>({
    queryFn: fetchTotalPendingJobs,
    queryKey: ["totalPendingJobs"],
  });
};

export const useGetRecentAppliedJobs = () => {
  const fetchRecentAppliedJobs = async () => {
    const response = await apiClient.get("/jobs/recent-applied-jobs");
    return response.data.data;
  };
  return useQuery<JobApplication[]>({
    queryFn: fetchRecentAppliedJobs,
    queryKey: ["appliedJobs"],
  });
};

export const useGetTotalJobs = () => {
  const fetchTotalJobs = async () => {
    const response = await apiClient.get("/jobs/total-jobs");
    return response.data.data;
  };
  return useQuery<TotalJobs>({
    queryFn: fetchTotalJobs,
    queryKey: ["totalJobs"],
  });
};
