import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../../Components/Input.tsx";
import Label from "../../Components/Label.tsx";
import useLogin from "./useLogin.tsx";

// ✅ Define type for your form data
type LoginFormData = {
  username_or_email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { login, loginError, loginStatus } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login({
      username_or_email: data.username_or_email,
      password: data.password,
    });
  };

  return (
    <div className="w-[30%] border border-gray-300 rounded-lg mt-10 mx-auto p-8 shadow-md justify-center">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="username_or_email">Username or Email</Label>
          <Input
            type="text"
            id="username_or_email"
            {...register("username_or_email", {
              required: "Username is required",
            })}
            placeholder="Enter your username or email"
          />
          <p
            className={`text-red-500 text-sm ${
              errors.username_or_email ? "visible" : "invisible"
            }`}
          >
            {errors.username_or_email?.message || "\u00A0"}
          </p>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Enter your password"
          />
          <p
            className={`text-red-500 text-sm ${
              errors.password ? "visible" : "invisible"
            }`}
          >
            {errors.password?.message || "\u00A0"}
          </p>
        </div>

        <p
          className={`text-red-500 text-sm ${
            loginError ? "visible" : "invisible"
          }`}
        >
          {loginError &&
            (loginError.response?.data?.error?.message ||
              "Login failed. Please try again.")}
        </p>

        <button
          type="submit"
          disabled={loginStatus === "loading"}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        >
          {loginStatus === "loading" ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
