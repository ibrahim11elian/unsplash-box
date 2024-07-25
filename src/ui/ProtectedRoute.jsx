import { useEffect } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Button from "./Button";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useUser();

  useEffect(() => {
    if (!currentUser && !isLoading) navigate("/login");
  }, [currentUser, isLoading, navigate]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );

  if (currentUser && !currentUser.emailVerified) {
    return (
      <div className="my-6 flex flex-col items-center gap-3 text-gray-800">
        <p>
          Your email is not verified. Please check your inbox for the
          verification email.
        </p>
        <Button onClick={() => currentUser.sendEmailVerification()}>
          Resend Verification Email
        </Button>
      </div>
    );
  }

  if (currentUser && currentUser.emailVerified) return children;
}

export default ProtectedRoute;
