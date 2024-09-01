import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
export default function useBooking() {
  return useQuery({
    queryKey: ["booking"],
    queryFn: () => apiClient.get("/bookmarks").then((res) => res.data.data),
  });
}
