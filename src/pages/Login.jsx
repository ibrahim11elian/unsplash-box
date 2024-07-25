import { useNavigate } from "react-router-dom";
import LoginForm from "../features/authentication/LoginForm";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import useTitle from "../hooks/useTitle";
import { useDarkMode } from "../context/DarkMode";

const Login = () => {
  const { isDarkMode } = useDarkMode();

  const navigate = useNavigate();
  const { currentUser, isLoading } = useUser();

  useEffect(() => {
    if (currentUser && !isLoading) navigate("/");
  }, [currentUser, isLoading, navigate]);

  useTitle("Login");

  if (isLoading)
    return (
      <div className="flex h-[calc(100dvh-10rem)] items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );
  return (
    <>
      <div className="flex h-[calc(100dvh-10rem)] flex-col items-center justify-center gap-3 px-3">
        <div>
          <img
            src={isDarkMode ? "/logo-light.svg" : "/logo.svg"}
            alt="logo"
            className="mb-3 w-52"
          />
        </div>
        <h2 className="text-3xl font-semibold text-gray-900">
          Login to your account
        </h2>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
