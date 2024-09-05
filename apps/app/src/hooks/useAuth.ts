import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient, { ApiError, ApiResponse } from "../utils/apiClient";
import { AxiosError } from "axios";

type LoginType = {
  email: string;
  password: string;
};
type SignupType = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export function useAuth() {
  const queryClient = useQueryClient();
  const loginMutation = useMutation<
    ApiResponse,
    AxiosError<ApiError>,
    LoginType
  >({
    mutationFn: (data: LoginType) => apiClient.post("/auth/signin", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
  const signUpMutation = useMutation<
    ApiResponse,
    AxiosError<ApiError>,
    SignupType
  >({
    mutationFn: (data: SignupType) => apiClient.post("/auth/signup", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return {
    login: {
      ...loginMutation,
    },
    signup: {
      ...signUpMutation,
    },
  };
}
