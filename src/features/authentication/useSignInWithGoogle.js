import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithGoogle } from "../../services/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useSignInWithGoogle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signIn, isPending: isLoading } = useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: (user) => {
      toast.success("SignedIn successfully");
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { signIn, isLoading };
}

export default useSignInWithGoogle;
