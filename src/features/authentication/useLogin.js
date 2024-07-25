import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    retry: false,
    onSuccess: (user) => {
      toast.success("Login successfully");
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { login, isLoggingIn };
}

export default useLogin;
