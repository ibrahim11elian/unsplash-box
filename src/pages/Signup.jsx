import useTitle from "../hooks/useTitle";
import SignupForm from "../features/authentication/SigupForm";
import { useDarkMode } from "../context/DarkMode";

function Signup() {
  const { isDarkMode } = useDarkMode();

  useTitle("Signup");

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
          Create new account
        </h2>
        <SignupForm />
      </div>
    </>
  );
}

export default Signup;
