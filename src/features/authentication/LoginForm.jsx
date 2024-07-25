import { useState } from "react";
import useLogin from "./useLogin";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { Link } from "react-router-dom";
import GoogleSignInButton from "../../ui/GoogleSignInButton";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const { login, isLoggingIn } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isError, errors: validationErrors } = validate({ email, password });
    if (isError) {
      setErrors(() => validationErrors);
      return;
    }
    login({ email, password });
  };
  return (
    <div className="w-full rounded-md border bg-transparent p-3 shadow sm:w-[25rem]">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="email" className="mb-2 text-gray-800">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            disabled={isLoggingIn}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-inherit px-3 py-2 text-gray-900 ring-gray-300 focus:outline-none focus:ring-1"
            placeholder="Email"
            autoFocus
          />

          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="mb-2 text-gray-800">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            disabled={isLoggingIn}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-inherit px-3 py-2 text-gray-900 ring-gray-300 focus:outline-none focus:ring-1"
            placeholder="Password"
          />

          {errors?.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <Button className={"border"} type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? <Spinner size="tiny" /> : "Login"}
        </Button>

        <p className="text-center text-gray-800">
          Don&apos;t have account?{" "}
          <Link to={"/signup"} className="text-blue-600">
            signup
          </Link>
        </p>

        {/* <!-- Divider --> */}
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center text-gray-800">OR</p>
        </div>
        <div className="flex justify-center">
          <GoogleSignInButton />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

function validate(values) {
  let errors = {};
  let isError = false;

  if (!values.email) {
    errors.email = "Email is required";
    isError = true;
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
    isError = true;
  }

  if (!values.password) {
    errors.password = "Password is required";
    isError = true;
  }

  return { errors, isError };
}
