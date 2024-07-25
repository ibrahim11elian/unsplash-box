import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../../services/authApi";

export const useUser = () => {
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
  });

  return { currentUser, isLoading, error };
};
