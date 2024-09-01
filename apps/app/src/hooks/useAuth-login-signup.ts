import { useMutation } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { useAuth } from "../context/authContext";

const useAuthLoginAndSignup = () => {
  const { setIsLoggedIn } = useAuth();
  const loginMutation = useMutation(
    async (userData) => {
      const response = await apiClient.post("/auth/signin", userData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
      },
      onError: (error) => {
        console.error(error);
        setIsLoggedIn(false);
      },
    }
  );

  const signupMutation = useMutation(
    async (userData) => {
      const response = await apiClient.post("/auth/signup", userData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
      },
      onError: (error) => {
        console.error(error);
        setIsLoggedIn(false);
      },
    }
  );

  return { loginMutation, signupMutation };
};

export default useAuthLoginAndSignup;
