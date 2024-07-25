import { useState } from "react";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import useSignup from "./useSignup";
import { Link } from "react-router-dom";
import GoogleSignInButton from "../../ui/GoogleSignInButton";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const { signup, isLoading } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isError, errors: validationErrors } = validate({ email, password });
    if (isError) {
      setErrors(() => validationErrors);
      return;
    }

    signup(
      { email, password },
      {
        onSettled: () => {
          setErrors(null);
          setEmail("");
          setPassword("");
        },
      },
    );
  };
  return (
    <div className="w-full rounded-md border bg-transparent p-3 shadow sm:w-[25rem]">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/*  Dummy hidden fields to prevent browser from recognizing sign up form  */}
        <input type="text" name="dummyUsername" className="hidden" />
        <input type="password" name="dummyPassword" className="hidden" />

        <div>
          <label htmlFor="email" className="mb-2 text-gray-800">
            Email
          </label>
          <input
            autoComplete="off"
            type="text"
            name="email"
            id="email"
            value={email}
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-inherit px-3 py-2 text-gray-900 ring-gray-300 focus:outline-none focus:ring-1"
            placeholder="Email"
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
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-inherit px-3 py-2 text-gray-900 ring-gray-300 focus:outline-none focus:ring-1"
            placeholder="Password"
            autoComplete="new-password"
          />

          {errors?.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <Button disabled={isLoading} className={"border"} type="submit">
          {isLoading ? <Spinner size="tiny" /> : "Sign up"}
        </Button>
        <p className="text-center text-gray-800">
          Have account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login
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

export default SignupForm;

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

  if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
    isError = true;
  }

  return { errors, isError };
}
