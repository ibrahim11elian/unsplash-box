import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => signupApi(email, password),
    retry: false,
    onSuccess: () => {
      toast.success(
        "Account created successfully \n Please check your inbox to verify your account",
      );
      navigate("/", { replace: true });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { signup, isLoading };
}

export default useSignup;
