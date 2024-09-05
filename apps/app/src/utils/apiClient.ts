import axios from "axios";

export type ApiResponse<T = unknown> = {
  data?: T;
  success: boolean;
  message: string;
};
export type ApiError = {
  message: string;
  success: boolean;
};
const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

export default apiClient;
