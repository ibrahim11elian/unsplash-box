import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/authApi";
import toast from "react-hot-toast";

function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.setQueryData(["user"], null);
      queryClient.removeQueries();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { logout, isLoading };
}

export default useLogout;
