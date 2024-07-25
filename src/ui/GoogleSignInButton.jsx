import googleIcon from "../assets/google-icon.svg";
import useSignInWithGoogle from "../features/authentication/useSignInWithGoogle";

const GoogleSignInButton = () => {
  const { signIn, isLoading } = useSignInWithGoogle();
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signIn();
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 disabled:cursor-not-allowed"
    >
      <img src={googleIcon} alt="Google Icon" className="mr-2 h-5 w-5" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
